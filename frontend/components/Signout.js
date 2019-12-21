import { useMutation } from 'react-apollo';

import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from '../graphql';

function Signout() {
  const [signOut, { loading, error }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  const onClick = e => {
    e.preventDefault();
    return signOut();
  }

  return <button onClick={onClick}>Sign Out</button>
}

export default Signout;
