import { useMutation } from 'react-apollo';
import Router from 'next/router';

// components
import Error from './ErrorMessage';

import Form from '../styles/Form';
import { useInput } from '../hooks';
import { CREATE_ITEM_MUTATION } from '../graphql';


function CreateItem() {
  const { bind: bindTitle, value: title, reset: resetTitle } = useInput('');
  const { bind: bindDescription, value: description, reset: resetDescription } = useInput('');
  const { bind: bindImage, value: image, reset: resetImage } = useInput('');
  const { bind: bindLargeImage, value: largeImage, reset: resetLargeImage } = useInput('');
  const { bind: bindPrice, value: price, reset: resetPrice } = useInput(0);

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION);

  const handleSubmit = async e => {
    e.preventDefault();
    const variables = { title, description, image, largeImage, price };
    const res = await createItem({ variables });

    Router.push({
      pathname: '/item',
      query: { id: res.data.createItem.id }
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
            {...bindTitle}
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
            {...bindPrice}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Enter A Description"
            required
            {...bindDescription}
          />
        </label>

        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}

export default CreateItem;
