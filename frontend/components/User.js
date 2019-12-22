import { useQuery } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../graphql';


const User = ({ children }) => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);

  if (!loading && data) return children(data);
  return null;
};

export default User;
