import { useQuery } from 'react-apollo';

import Error from './ErrorMessage';
import Spinner from './Spinner';
import UserPermissions from './UserPermissions';

import { ALL_USERS_QUERY } from '../graphql';
import Table from '../styles/Table';
import possiblePermissions from '../utils/permissions';


const Permissions = () => {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY);

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;

  return <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        {possiblePermissions.map((permission, index) => <th key={index}>{permission}</th>)}
        <th>👇</th>
      </tr>
    </thead>

    <tbody>
      {data.users.map(user => <UserPermissions user={user} key={user.id} />)}
    </tbody>
  </Table>
};

export default Permissions;
