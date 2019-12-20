import { useMutation } from 'react-apollo';

import { SIGNUP_MUTATION } from '../graphql';
import Form from '../styles/Form';
import Error from '../components/ErrorMessage';
import { useInput } from '../hooks';


function Signup() {
  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const { bind: bindEmail, value: email, reset: resetEmail } = useInput('');
  const { bind: bindName, value: name, reset: resetName } = useInput('');
  const { bind: bindPassword, value: password, reset: resetPassword } = useInput('');

  const onSubmit = async e => {
    e.preventDefault();

    const variables = { name, email, password };
    try {
      const res = await signUp({ variables });
      console.log(res);
    } finally {
      resetEmail();
      resetName();
      resetPassword();
    }
  }

  return (
    <Form method='POST' onSubmit={onSubmit}>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Signup for An Account</h2>
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

        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            required
            {...bindName}
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

        <button type="submit">Signup</button>
      </fieldset>
    </Form>
  );
}

export default Signup;
