const User = require("../models/user");

const addUser = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const user = await User.create({
      name: name,
      email: email,
      phoneNumber: parseInt(phoneNumber),
    });
    res.status(200).json({
      msg: `Student with name ${name} is successfully added`,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error encountered while adding user" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll();
    if (user.length == 0) {
      res.status(404).json({ msg: "No user in database" });
      return;
    }
    res.status(200).json({
      msg: "Here is the list of all users",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error encountered while fetching users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.destroy({ where: { id: id } });
    if (!user) {
      res.status(404).json({ msg: "user not found" });
      return;
    }
    res.status(200).json({ msg: `User with id ${id} has been deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error encountered while deleting user" });
  }
};

module.exports = {
  addUser,
  getAllUser,
  deleteUser,
};
