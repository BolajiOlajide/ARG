import { useMutation } from 'react-apollo';

import { REQUEST_RESET_MUTATION } from '../graphql';
import Form from '../styles/Form';
import Error from './ErrorMessage';
import { useInput } from '../hooks';


function RequestReset() {
  const [requestReset, { loading, error, called }] = useMutation(REQUEST_RESET_MUTATION);

  const { bind: bindEmail, value: email, reset: resetEmail } = useInput('');

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await requestReset({ variables: { email } });
    } finally {
      resetEmail();
    }
  }

  return (
    <Form method='POST' onSubmit={onSubmit}>
      <Error error={error} />
      {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request a Password Reset</h2>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            required
            {...bindEmail}
          />
        </label>

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
