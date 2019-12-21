import { useQuery } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../graphql';


const User = () => {
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);
  // console.log(data.me, '<====');

  if (!loading && data.me) return <span>{data.me.name}</span>
  return null;
};

export default User;
