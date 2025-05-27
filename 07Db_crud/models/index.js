const Student = require("./students");
const Department = require("./department");
const Course = require("./course");
const studentCourse = require("./studentCourse");

//one to many
Department.hasMany(Student);
Student.belongsTo(Department);

//many to many
Student.belongsToMany(Course, { through: studentCourse });
Course.belongsToMany(Student, { through: studentCourse });

module.exports = {
  Student,
  Department,
  Course,
  studentCourse,
};
