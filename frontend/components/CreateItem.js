import { useState } from 'react';
import { useMutation } from 'react-apollo';
import Router from 'next/router';

// components
import Error from './ErrorMessage';

import Form from '../styles/Form';
import { useInput } from '../hooks';
import { CREATE_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../graphql';


function CreateItem() {
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    refetchQueries: [{
      query: ALL_ITEMS_QUERY,
      variables: { skip: 0 }
    }]
  });

  const uploadImage = async e => {
    const { files: [file] } = e.target;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'sickfits');

    if (file) {
      const url = 'https://api.cloudinary.com/v1_1/proton/image/upload';
      const method = 'POST'
      const _response = await fetch(url, { method, body: data });
      const response = await _response.json();

      const {
        secure_url: imageLink,
        eager: [{secure_url: largeImage}]
      } = response;

      setImage(imageLink);
      setLargeImage(largeImage);
    }
  }

  const { bind: bindTitle, value: title } = useInput('');
  const { bind: bindDescription, value: description } = useInput('');
  const { bind: bindPrice, value: price } = useInput(0);
  const [image, setImage] = useState('');
  const [largeImage, setLargeImage] = useState('');

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

        <label htmlFor="file">
          Image
          <input
            type="file"
            name="file"
            id="file"
            placeholder="Upload an Image"
            required
            onChange={uploadImage}
          />
          {image && <img width="200" src={image} alt="Image to be submitted" />}
        </label>

        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}

export default CreateItem;
