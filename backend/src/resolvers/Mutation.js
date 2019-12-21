const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Mutations = {
  async createItem(_, args, context, info) {
    const item = await context.db.mutation.createItem({
      data: { ...args }
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
  }
};

module.exports = Mutations;
