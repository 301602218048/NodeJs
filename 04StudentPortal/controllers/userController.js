const userService = require("../services/userService");
const { sendErrorResponse, sendResponse } = require("../utils/response");

const fetchUser = (req, res) => {
  const users = userService.getAllUsers();
  if (users.length > 0) {
    console.log(users);
    return sendResponse(res, "Fetching all users", 200);
  } else {
    return sendErrorResponse(res, {
      message: "No user in userList",
      statusCode: 404,
    });
  }
};

const fetchUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = userService.getUserById(id);
  if (user) {
    console.log(user);
    return sendResponse(res, `Fetching user with ID: ${id}`, 200);
  } else {
    return sendErrorResponse(res, {
      message: "User not found",
      statusCode: 404,
    });
  }
};

const addUser = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return sendErrorResponse(res, {
      message: "User name is required",
      statusCode: 400,
    });
  }
  const user = userService.addUser(name);
  return sendResponse(res, `Added new user: ${user.name}`, 200);
};

module.exports = { fetchUser, fetchUserById, addUser };
