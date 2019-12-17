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
  }
};

module.exports = Mutations;
