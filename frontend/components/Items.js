import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';

// components
import Spinner from '../components/Spinner';
import Item from './Item';

// utils
import { queryOpts } from '../config';
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

function Items() {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY, queryOpts);

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;

  return (
    <Center>
      <ItemList>
        {data.items.map(item => <Item key={item.id} item={item} />)}
      </ItemList>
    </Center>
  )
}

export default Items;
