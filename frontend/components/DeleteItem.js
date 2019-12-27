import { useMutation } from 'react-apollo';

import { DELETE_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../graphql';
import ItemBtn from '../styles/ItemBtn';


function DeleteItem({ id }) {
  function update(cache, { data: { deleteItem: { id: deletedItemId } }}) {
    // manually update the cache
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    const updatedItems = data.items.filter(item => item.id !== deletedItemId);
    cache.writeQuery({
      query: ALL_ITEMS_QUERY,
      data: { items: updatedItems },
    });
  }

  const [deleteItem, { loading }] = useMutation(DELETE_ITEM_MUTATION, { update });

  const onClick = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      const variables = { id };
      return deleteItem({ variables }).catch(err => alert(err.message));
    }
  }

  return (<ItemBtn onClick={onClick}>
    Delet{loading ? 'ing' : 'e'} this item
  </ItemBtn>);
}

export default DeleteItem;
