const express = require("express");
const router = express.Router();

const users = [];

router.get("/", (req, res) => {
  if (users.length > 0) {
    console.log(users);
    res.send("Fetching all users");
  } else {
    res.send("No user in userList");
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id <= users.length) {
    const user = users[id - 1];
    console.log(user);
    res.send(`Fetching user with ID: ${id}`);
  } else {
    res.send("User not found");
  }
});

router.post("/", (req, res) => {
  const obj = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(obj);
  res.send("Adding a new user");
});

module.exports = { router, users };
