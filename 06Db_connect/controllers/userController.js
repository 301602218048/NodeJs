const User = require("../models/user");

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({
      name: name,
      email: email,
    });
    res.status(200).send(`Student with name ${name} is successfully added`);
  } catch (error) {
    res.status(500).send("Error encountered while adding user");
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll();
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Error encountered while fetching users");
  }
};

module.exports = {
  addUser,
  getAllUser,
};
