import React from 'react';

import { getUsers, createUser, updateUser, deleteUser } from './api';

const getDeveloperText = (isDeveloper) =>
  `is ${isDeveloper ? 'a' : 'not a'} developer`;

const App = () => {
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    const doGetUsers = async () => {
      const result = await getUsers();
      setUsers(result);
    };

    doGetUsers();
  }, []);

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
    </div>
  );
};

export default App;
