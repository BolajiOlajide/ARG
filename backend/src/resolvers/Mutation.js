const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const { transport, makeANiceEmail } = require('../utils/mail');
const { hasPermission } = require('../utils/permissions');


const Mutations = {
  async createItem(_, args, context, info) {
    const { userId } = context.request;

    if (!userId) throw new Error('You must be logged in to create an item.');

    // create relationsjip between item and user in prisma
    const user = { connect: { id: userId } };

    const item = await context.db.mutation.createItem({
      data: { ...args, user }
    }, info);

    return item;
  },
  updateItem(_, args, context, info) {
    const { id, ...data } = args;
    return context.db.mutation.updateItem({
      where: { id },
      data
    }, info);
  },
  async deleteItem(_, args, context, info) {
    const { id } = args;
    const where = { id };

    const item = await context.db.query.item({ where }, `{
      id
      title
    }`);

    return context.db.mutation.deleteItem({ where }, info);
  },
  async signup(_, args, context, info) {
    const email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);

    const permissions = { set: ['USER'] };
    const data = { ...args, email, password, permissions };

    const user = await context.db.mutation.createUser({ data }, info);

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  async signin(_, args, context, __) {
    const { password } = args;
    const email = args.email.toLowerCase();

    const user = await context.db.query.user({ where: { email } });

    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  signout(_, __, context, ___) {
    context.response.clearCookie('token');

    return { message: 'Goodbye!' };
  },
  async requestReset(_, args, context, __) {
    const email = args.email.toLowerCase();

    const user = await context.db.query.user({ where: { email} });

    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    const promisifiedRandomBytes = promisify(randomBytes);
    const resetToken = (await promisifiedRandomBytes(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    await context.db.mutation.updateUser({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    });

    const mailText = `Your password reset token is here.

<a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">
  Click here to reset your password
</a>
    `;

    const mailResponse = transport.sendMail({
      from: 'coop@proton.com',
      to: user.email,
      subject: 'Your Password reset token!',
      html: makeANiceEmail(mailText)
    })

    return { message: 'Password reset done!' };
  },
  async resetPassword(_, args, ctx, info) {
    const { password, confirmPassword, resetToken } = args;

    if (password !== confirmPassword) throw new Error('Your passwords don\'t match');

    const [user] = await ctx.db.query.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now - 3600000
      }
    });

    if (!user) throw new Error('This token is either invalid or expired');

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return updatedUser;
  },
  async updatePermissions(_, args, ctx, info) {
    const { userId, user } = ctx.request;
    const { permissions } = args

    if (!userId) throw new Error('You must be logged in!');

    hasPermission(user, ['ADMIN', 'PERMISSIONUPDATE']);

    return ctx.db.mutation.updateUser({
      data: { permissions: { set: permissions } },
      where: { id: args.userId }
    }, info);
  }
};

module.exports = Mutations;
