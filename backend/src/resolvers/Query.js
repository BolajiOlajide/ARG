const { forwardTo } = require('prisma-binding');


const Query = {
  // forward this resolver directly to Prisma
  items: forwardTo('db')
};

module.exports = Query;
