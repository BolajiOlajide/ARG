import { useState } from 'react';
import { useMutation } from 'react-apollo';

import Error from './ErrorMessage';
import SickButton from '../styles/SickButton';
import { UPDATE_PERMISSON_MUTATION } from '../graphql';
import possiblePermissions from '../utils/permissions';


const UserPermissions = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);
  const [updatePermissions, { loading, error }] = useMutation(UPDATE_PERMISSON_MUTATION);

  function handlePermissionChange(e) {
    const checkbox = e.target;
    let updatedPermissions = [...permissions];

    if (checkbox.checked) updatedPermissions.push(checkbox.value);
    else updatedPermissions = updatedPermissions.filter(p => p !== checkbox.value);

    setPermissions(updatedPermissions);
  }

  function handlePermissionUpdate() {
    const variables = { permissions, userId: user.id };

    return updatePermissions({ variables });
  }

  return <>
    {error && <tr><td colspan="8"><Error error={error} /></td></tr>}
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {possiblePermissions.map((permission, index) => (
        <td key={index}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              id={`${user.id}-permission-${permission}`}
              type="checkbox"
              checked={permissions.includes(permission)}
              value={permission}
              onChange={handlePermissionChange}
            />
          </label>
        </td>
      ))}
      <td>
        <SickButton disabled={loading} onClick={handlePermissionUpdate}>
          UPDAT{loading ? 'ing' : 'E'}
        </SickButton>
      </td>
    </tr>
  </>;
};

export default UserPermissions;
