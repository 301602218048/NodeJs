const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbConnection");

const studentCourse = sequelize.define("studentCourses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = studentCourse;
