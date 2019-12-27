import { useQuery, useMutation } from 'react-apollo';

import CartStyles from '../styles/CartStyles';
import Supreme from '../styles/Supreme';
import SickButton from '../styles/SickButton';
import CloseButton from '../styles/CloseButton';
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../graphql';
import Spinner from './Spinner';
import Error from './ErrorMessage';


const Cart = () => {
  const { loading, error, data } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;

  return <CartStyles open={data.cartOpen}>
    <header>
      <CloseButton title="close" onClick={toggleCart}>&times;</CloseButton>
      <Supreme>Your Cart</Supreme>
      <p>You have __ Items in your cart.</p>
    </header>

    <footer>
      <p>$10.10</p>
      <SickButton>Checkout</SickButton>
    </footer>
  </CartStyles>
};

export default Cart;
