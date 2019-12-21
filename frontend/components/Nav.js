import { Fragment } from 'react';
import Link from 'next/link';

import User from './User';
import NavStyle from '../styles/NavStyles';
import Signout from './Signout';

const Nav = () => (
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

export default Nav;
