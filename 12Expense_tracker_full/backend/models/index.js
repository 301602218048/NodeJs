const Users = require("./user");
const Expenses = require("./expense");
const Orders = require("./order");

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Users.hasMany(Orders);
Orders.belongsTo(Users);

module.exports = {
  Users,
  Expenses,
  Orders,
};
