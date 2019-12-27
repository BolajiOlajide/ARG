import CartStyles from '../styles/CartStyles';
import Supreme from '../styles/Supreme';
import SickButton from '../styles/SickButton';
import CloseButton from '../styles/CloseButton';


const Cart = () => {
  return <CartStyles open>
    <header>
      <CloseButton title="close">&times;</CloseButton>
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
