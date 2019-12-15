const Mutations = {
  async createItem(_, args, context, info) {
    const item = await context.db.mutation.createItem({
      data: { ...args }
    }, info);

    return item;
  }
};

module.exports = Mutations;
