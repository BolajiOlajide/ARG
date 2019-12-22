import { useQuery } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../graphql';
import Spinner from './Spinner';
import Error from './ErrorMessage';
import Signin from './Signin';

const PleaseSignIn = props => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;
  if (!data.me) return (
    <>
      <Error error={{ message: 'Please sign in before creating an item' }} />
      <Signin />
    </>
  );

  return props.children;
};

export default PleaseSignIn;
