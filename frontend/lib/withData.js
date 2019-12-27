import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../graphql';

function createClient({ headers }) {
  return new ApolloClient({
    uri: endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, __, { cache }) {
            const { cartOpen } = cache.readQuery({ query: LOCAL_STATE_QUERY });

            const data = { data : { cartOpen: !cartOpen } };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        cartOpen: true
      }
    }
  });
}

export default withApollo(createClient);
