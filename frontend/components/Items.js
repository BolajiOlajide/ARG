import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';

// components
import Spinner from '../components/Spinner';
import Item from './Item';
import Pagination from './Pagination';

// utils
import { queryOpts, perPage } from '../config';
import { ALL_ITEMS_QUERY } from '../graphql'

const Center = styled.div`
  text-align: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

function Items({ page }) {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY, {
    ...queryOpts,
    variables: { skip: (page * perPage) - perPage },
    // fetchPolicy: "network-only" // cool but you lose the adv. of caching
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;

  return (
    <Center>
      <Pagination page={page} />
      <ItemList>
        {data.items.map(item => <Item key={item.id} item={item} />)}
      </ItemList>
      <Pagination page={page} />
    </Center>
  )
}

export default Items;
