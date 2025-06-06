const Signup = require("../models/signup");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const e = await Signup.findOne({ where: { email: email } });
    if (e) {
      if (e.password === password) {
        res.status(400).json({ msg: "User already exists", data: null });
        return;
      }
      res.status(400).json({ msg: "Email already exists", data: null });
      return;
    }
    const user = await Signup.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(201).json({ msg: "signed up successfully", data: user });
  } catch (error) {
    res.status(500).json({ msg: error.message, data: null });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const e = await Signup.findOne({ where: { email: email } });
    if (e) {
      if (e.password === password) {
        res.status(200).json({ msg: "Logged in successfully", data: e });
        return;
      }
      res.status(400).json({ msg: "Incorrect password", data: null });
      return;
    }
    res.status(400).json({ msg: "User not found", data: null });
  } catch (error) {
    res.status(500).json({ msg: error.message, data: null });
  }
};

module.exports = {
  addUser,
  userLogin,
};
