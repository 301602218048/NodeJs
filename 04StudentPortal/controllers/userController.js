const users = [];

const fetchUser = (req, res) => {
  if (users.length > 0) {
    console.log(users);
    res.send("Fetching all users");
  } else {
    res.send("No user in userList");
  }
};

const fetchUserById = (req, res) => {
  const id = req.params.id;
  if (id <= users.length) {
    const user = users[id - 1];
    console.log(user);
    res.send(`Fetching user with ID: ${id}`);
  } else {
    res.send("User not found");
  }
};

const addUser = (req, res) => {
  const obj = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(obj);
  res.send("Adding a new user");
};

module.exports = { fetchUser, fetchUserById, addUser, users };
