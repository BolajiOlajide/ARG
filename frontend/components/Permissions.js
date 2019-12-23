import { useQuery } from 'react-apollo';

import Error from './ErrorMessage';
import { ALL_USERS_QUERY } from '../graphql';
import Spinner from './Spinner';
import Table from '../styles/Table';
import SickButton from '../styles/SickButton';


const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE'
];

const User = ({ user }) => {
  return <tr>
    <td>{user.name}</td>
    <td>{user.email}</td>
    {possiblePermissions.map(permission => (
      <td>
        <label htmlFor={`${user.id}-permission-${permission}`}>
          <input type="checkbox" />
        </label>
      </td>
    ))}
  </tr>;
}

const Permissions = () => {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY);

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;

  return <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        {possiblePermissions.map(permission => <th>{permission}</th>)}
        <th>👇</th>
      </tr>
    </thead>

    <tbody>
      {data.users.map(user => <User user={user} />)}
    </tbody>
  </Table>
};

export default Permissions;
