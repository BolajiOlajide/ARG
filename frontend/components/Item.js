import Link from 'next/link';
import Title from '../styles/Title';
import ItemStyles from '../styles/ItemStyles';
import PriceTag from '../styles/PriceTag';
import styled from 'styled-components';

// utils
import formatMoney from '../lib/formatMoney';


const ItemCTA = styled.button`
  cursor: pointer;
  font-size: 1rem;
  color: #393939;
`;

function Item({ item }) {
  return (
    <ItemStyles>
      {item.image && <img src={item.image} alt={`image for ${item.title}`} />}
      <Title>
        <Link href={{
          pathname: 'item',
          query: { id: item.id }
        }}>
          {item.title}
        </Link>
      </Title>

      <PriceTag>{formatMoney(item.price)}</PriceTag>

      <p>{item.description}</p>

      <div className="buttonList">
        <Link href={{
          pathname: "update",
          query: { id: item.id }
        }}>
          Edit ✏️
        </Link>
        <ItemCTA>Add to Cart</ItemCTA>
        <ItemCTA>Delete</ItemCTA>
      </div>
    </ItemStyles>
  );
}

export default Item;
