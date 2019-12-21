const { forwardTo } = require('prisma-binding');


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
  }
};

module.exports = Query;
