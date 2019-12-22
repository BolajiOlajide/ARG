import { useQuery } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from '../styles/PaginationStyles';
import { PAGINATION_QUERY } from '../graphql';
import { perPage } from '../config';


function Pagination({ page }) {
  const { data, error, loading } = useQuery(PAGINATION_QUERY);

  if (loading) return <span>Loading...</span>;

  const { count } = data.itemsConnection.aggregate;
  const pages = Math.ceil(count / perPage);

  return <PaginationStyles>
    <Head>
      <title>Sick Fits | Page {page} of {pages || 1}</title>
    </Head>

    <Link prefetch href={{
      pathname: "/items",
      query: { page: page - 1 }
    }}>
      <a className="prev" aria-disabled={page <= 1}> ← Prev</a>
    </Link>

    <p>You're on page {page} of {pages || 1}</p>
    <p>{count} Items Total</p>

    <Link prefetch href={{
      pathname: "/items",
      query: { page: page + 1 }
    }}>
      <a className="next" aria-disabled={page >= pages}>Next → </a>
    </Link>
  </PaginationStyles>;
}

export default Pagination;
