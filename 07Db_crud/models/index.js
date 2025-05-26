const Student = require("./students");
const Department = require("./department");

Department.hasMany(Student);
Student.belongsTo(Department);

module.exports = {
  Student,
  Department,
};
