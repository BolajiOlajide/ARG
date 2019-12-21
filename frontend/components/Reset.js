import { useMutation } from 'react-apollo';

import { RESET_PASSWORD_MUTATION, CURRENT_USER_QUERY } from '../graphql';
import Form from '../styles/Form';
import Error from './ErrorMessage';
import { useInput } from '../hooks';


function ResetPassword({ token }) {
  const [resetPasswordFn, { loading, error }] = useMutation(RESET_PASSWORD_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  const { bind: bindPassword, value: password, reset: resetPassword } = useInput('');
  const { bind: bindConfirmPassword, value: confirmPassword, reset: resetConfirmPassword } = useInput('');

  const onSubmit = async e => {
    e.preventDefault();

    const variables = { password, confirmPassword, resetToken: token }

    try {
      await resetPasswordFn({ variables });
    } finally {
      resetPassword();
      resetConfirmPassword();
    }
  }

  return (
    <Form method='POST' onSubmit={onSubmit}>
      <Error error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset your password</h2>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your new password"
            required
            {...bindPassword}
          />
        </label>

        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-enter your password"
            required
            {...bindConfirmPassword}
          />
        </label>

        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}

export default ResetPassword;
