const Signup = require("../models/signup");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Signup.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json({ msg: "signed up successfully", data: user });
  } catch (error) {
    res.status(500).json({ msg: error.msg, data: null });
  }
};

module.exports = {
  addUser,
};
