const users = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((u) => u.id === id);
};

const addUser = (name) => {
  const user = {
    id: users.length + 1,
    name,
  };
  users.push(user);
  return user;
};

module.exports = { getAllUsers, getUserById, addUser };
