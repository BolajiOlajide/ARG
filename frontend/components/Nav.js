import { Fragment } from 'react';
import Link from 'next/link';
import { useMutation } from 'react-apollo';

import User from './User';
import NavStyle from '../styles/NavStyles';
import Signout from './Signout';
import { TOGGLE_CART_MUTATION } from '../graphql';

const Nav = () => {
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  return (
    <User>
      {({ me }) => (
        <NavStyle>
          <Link href="/items">
            <a>Shop</a>
          </Link>

          {me && (
            <Fragment>
              <Link href="/sell">
                <a>Sell</a>
              </Link>

              <Link href="/orders">
                <a>Orders</a>
              </Link>

              <Link href="/me">
                <a>Account</a>
              </Link>

              <button onClick={toggleCart}>My Cart</button>

              <Signout />
            </Fragment>
          )}

          {!me && (
            <Link href="/signup">
              <a>Signin</a>
            </Link>
          )}
        </NavStyle>
      )}
    </User>
  );
}

export default Nav;
