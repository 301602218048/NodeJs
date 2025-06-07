const Users = require("./user");
const Expenses = require("./expense");

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

module.exports = {
  Users,
  Expenses,
};
