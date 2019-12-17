import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';

import { SINGLE_ITEM_QUERY } from '../graphql';
import Spinner from './Spinner';
import Error from './ErrorMessage';


const SingleItemStyle = styled.div`
  max-width: 1200px;
  box-shadow: ${props => props.theme.bs};
  margin: 2rem auto;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

function SingleItem({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id }
  });

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;
  if (!data.item) return <Error error={{ message: `No item found for ID: ${id}` }} />;

  const { title, description, largeImage } = data.item;

  return <SingleItemStyle>
    <Head>
      <title>Sick Fits | {title}</title>
    </Head>
    <img src={largeImage} alt={`Image for ${title}`} />
    <div className="details">
      <h2>Viewing {title}</h2>
      <p>{description}</p>
    </div>
  </SingleItemStyle>
}

export default SingleItem;
