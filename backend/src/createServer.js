const { GraphQLServer } = require('graphql-yoga');

const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');


// Create the GraphQL YOga server
module.exports = function() {
  const typeDefs = 'src/schema.graphql';

  const server = new GraphQLServer({
    typeDefs,
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });

  return server;
}
