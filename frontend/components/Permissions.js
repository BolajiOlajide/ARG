import { useState } from 'react';
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

const UserPermissions = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);

  function handlePermissionChange(e) {
    const checkbox = e.target;
    let updatedPermissions = [...permissions];

    if (checkbox.checked) updatedPermissions.push(checkbox.value);
    else updatedPermissions = updatedPermissions.filter(p => p !== checkbox.value);

    setPermissions(updatedPermissions);
  }

  return <tr>
    <td>{user.name}</td>
    <td>{user.email}</td>
    {possiblePermissions.map((permission, index) => (
      <td key={index}>
        <label htmlFor={`${user.id}-permission-${permission}`}>
          <input
            type="checkbox"
            checked={permissions.includes(permission)}
            value={permission}
            onChange={handlePermissionChange}
          />
        </label>
      </td>
    ))}
    <td><SickButton>UPDATE</SickButton></td>
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
