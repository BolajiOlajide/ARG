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
  }
};

module.exports = Mutations;
