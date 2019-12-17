import Link from 'next/link';

import Title from '../styles/Title';
import ItemStyles from '../styles/ItemStyles';
import PriceTag from '../styles/PriceTag';
import ItemBtn from '../styles/ItemBtn';

// utils
import formatMoney from '../lib/formatMoney';

// components
import DeleteItem from './DeleteItem';


function Item({ item }) {
  return (
    <ItemStyles>
      {item.image && <img src={item.image} alt={`image for ${item.title}`} />}
      <Title>
        <Link href={{
          pathname: 'item',
          query: { id: item.id }
        }}>
          <a>{item.title}</a>
        </Link>
      </Title>

      <PriceTag>{formatMoney(item.price)}</PriceTag>

      <p>{item.description}</p>

      <div className="buttonList">
        <Link href={{
          pathname: "update",
          query: { id: item.id }
        }}>
          <a>Edit ✏️</a>
        </Link>
        <ItemBtn>Add to Cart</ItemBtn>
        <DeleteItem id={item.id} />
      </div>
    </ItemStyles>
  );
}

export default Item;
