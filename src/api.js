import { v4 as uuidv4 } from 'uuid';

const idOne = uuidv4();
const idTwo = uuidv4();

// pseudo database
let users = {
  [idOne]: {
    id: idOne,
    firstName: 'Christian',
    lastName: 'Boyle',
    isDeveloper: true,
  },
  [idTwo]: {
    id: idTwo,
    firstName: 'Lizzy',
    lastName: 'Boyle',
    isDeveloper: false,
  },
};

// pseudo API
export const getUsers = () =>
  new Promise((resolve, reject) => {
    if (!users) {
      return setTimeout(() => reject(new Error('Users not found')), 250);
    }

    setTimeout(() => resolve(Object.values(users)), 250);
  });

// const doGetUsers = async () => {
//   try {
//     const result = await getUsers();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// doGetUsers();

export const getUser = (id) =>
  new Promise((resolve, reject) => {
    const user = users[id];

    if (!user) {
      return setTimeout(() => reject(new Error('User not found')), 250);
    }

    setTimeout(() => resolve(users[id]), 250);
  });

// const doGetUser = async (id) => {
//   try {
//     const result = await getUser(id);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// doGetUser(idTwo);

export const createUser = (data) =>
  new Promise((resolve, reject) => {
    if (!data.firstName || !data.lastName) {
      reject(new Error('Not all information provided'));
    }

    const id = uuidv4();
    const newUser = { id, ...data };

    users = { ...users, [id]: newUser };

    setTimeout(() => resolve(true), 250);
  });

// const doCreateUser = async (data) => {
//   try {
//     const result = await createUser(data);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// doCreateUser({ firstName: 'Baxter', lastName: 'Boyle' });

// console.log(users);

export const updateUser = (id, data) =>
  new Promise((resolve, reject) => {
    if (!users[id]) {
      return setTimeout(() => reject(new Error('User not found')), 250);
    }

    users[id] = { ...users[id], ...data };

    return setTimeout(() => {
      resolve(true);
    }, 250);
  });

// const doUpdateUser = async (id, data) => {
//   try {
//     const result = await updateUser(id, data);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// console.log(users[idTwo].isDeveloper); // false

// doUpdateUser(idTwo, { isDeveloper: true });

// console.log(users[idTwo].isDeveloper); // true

export const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    const { [id]: user, ...rest } = users;

    if (!user) {
      return setTimeout(() => reject(new Error('User not found')), 250);
    }

    users = { ...rest };

    return setTimeout(() => resolve(true), 250);
  });

// const doDeleteUser = async (id) => {
//   try {
//     const result = await deleteUser(id);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// console.log(users); // idOne, idTwo

// doDeleteUser(idTwo);

// console.log(users); // idOne
