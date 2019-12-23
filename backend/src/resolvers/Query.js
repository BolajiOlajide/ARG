const { forwardTo } = require('prisma-binding');

const { hasPermission } = require('../utils/permissions');


const Query = {
  // forward this resolver directly to Prisma
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(_, args, context, info) {
    // check if there's a current user Id
    const { userId } = context.request;
    if (!userId) {
      return null;
    }
    return context.db.query.user({
      where: { id: userId }
    }, info);
  },
  users: (_, __, context, info) => {
    const { userId, user } = context.request;

    if (!userId) throw new Error('you must be logged in to run this query!');

    hasPermission(user, ['ADMIN', 'PERMISSIONUPDATE']);

    return context.db.query.users({}, info);
  }
};

module.exports = Query;
