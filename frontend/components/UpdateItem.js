import { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import Router from 'next/router';

// components
import Error from './ErrorMessage';
import Spinner from './Spinner';

import Form from '../styles/Form';
import { UPDATE_ITEM_MUTATION, SINGLE_ITEM_QUERY } from '../graphql';
import { queryOpts } from '../config';


function UpdateItem({ id }) {
  const queryOptions = {
    ...queryOpts,
    variables: { id }
  };
  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION);
  const { data, loading: isQueryLoading, error: queryError } = useQuery(SINGLE_ITEM_QUERY, queryOptions);

  if (isQueryLoading) return <Spinner />;
  if (queryError) return <Error error={queryError} />;
  if (!data.item) return <Error error={{ message: `No item found for ID: ${id}` }} />;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const variables = {
      ...(title && { title }),
      ...(description && { description }),
      ...(price && { price }),
      id
    };
    await updateItem({ variables });

    Router.push({
      pathname: '/item',
      query: { id }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            name="title"
            id="title"
            placeholder="Title"
            type="text"
            required
            defaultValue={data.item.title}
            onChange={({ target: { value }}) => setTitle(value)}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            name="price"
            id="price"
            placeholder="Price (in $)"
            type="number"
            required
            defaultValue={data.item.price}
            onChange={({ target: { value }}) => setPrice(value)}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Enter A Description"
            required
            defaultValue={data.item.description}
            onChange={({ target: { value }}) => setDescription(value)}
          />
        </label>

        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </Form>
  );
}

export default UpdateItem;
