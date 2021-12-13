import React from 'react';

import { getUsers, createUser, updateUser, deleteUser } from './api';

const getDeveloperText = (isDeveloper) =>
  `is ${isDeveloper ? 'a' : 'not a'} developer`;

const App = () => {
  const [users, setUsers] = React.useState(null);

  const doGetUsers = React.useCallback(async () => {
    try {
      const result = await getUsers();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    doGetUsers();
  }, [doGetUsers]);

  const refetchUsers = async () => {
    await doGetUsers();
  };

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      await createUser({ firstName, lastName, isDeveloper: false });
      await refetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  if (!users) {
    return null;
  }

  return (
    <div>
      <ul>
        {users.map((user) => {
          const developerText = getDeveloperText(user.isDeveloper);

          return (
            <li key={user.id}>
              {user.firstName} {user.lastName} {developerText}
            </li>
          );
        })}
      </ul>

      <hr />

      <span>Create User:</span>

      <form onSubmit={handleCreate}>
        <label>
          First Name:
          <input type="input" onChange={handleChangeFirstName} />
        </label>

        <label>
          Last Name:
          <input type="input" onChange={handleChangeLastName} />
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default App;
