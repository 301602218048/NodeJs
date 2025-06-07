const jwt = require("jsonwebtoken");
const Users = require("../models/user");
require("dotenv").config();

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, process.env.JWT_SECRET);
    Users.findByPk(user.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false });
  }
};

module.exports = {
  authenticate,
};
