import { useMutation } from 'react-apollo';

import { SIGNIN_MUTATION, CURRENT_USER_QUERY } from '../graphql';
import Form from '../styles/Form';
import Error from '../components/ErrorMessage';
import { useInput } from '../hooks';


function Signin() {
  const [signIn, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  const { bind: bindEmail, value: email, reset: resetEmail } = useInput('');
  const { bind: bindPassword, value: password, reset: resetPassword } = useInput('');

  const onSubmit = async e => {
    e.preventDefault();

    const variables = { email, password };
    try {
      await signIn({ variables });
    } finally {
      resetEmail();
      resetPassword();
    }
  }

  return (
    <Form method='POST' onSubmit={onSubmit}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign into your account!</h2>
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

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
            {...bindPassword}
          />
        </label>

        <button type="submit">Signin</button>
      </fieldset>
    </Form>
  );
}

export default Signin;
