const Signup = require("../models/signup");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const e = await Signup.findOne({ where: { email: email } });
    if (e) {
      return res
        .status(400)
        .json({ msg: "Email already exists", success: false });
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      console.log(err);
      await Signup.create({
        name: name,
        email: email,
        password: hash,
      });
      res.status(201).json({ msg: "signed up successfully", success: true });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const e = await Signup.findOne({ where: { email } });
    if (!e) {
      return res.status(404).json({ msg: "User not found", success: false });
    }
    const isCorrect = await bcrypt.compare(password, e.password);
    if (!isCorrect) {
      return res
        .status(400)
        .json({ msg: "Password is incorrect", success: false });
    }
    res.status(200).json({ msg: "Logged in successfully", success: true });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false });
  }
};

module.exports = {
  addUser,
  userLogin,
};
