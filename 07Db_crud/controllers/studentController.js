const Department = require("../models/department");
const Student = require("../models/students");

const getAllStudents = async (req, res) => {
  try {
    const student = await Student.findAll();
    if (student.length == 0) {
      res.status(404).json({ msg: "No student in database" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = await Student.create({
      name: name,
      email: email,
    });
    res
      .status(201)
      .json({ msg: `Student with name ${name} is successfully added` });
  } catch (error) {
    res.status(500).json({ msg: "Unable to make an entry" });
  }
};

const addValuesToStudentAndDepartmentTable = async (req, res) => {
  try {
    const { departmentName, studentName, studentEmail } = req.body;
    let department = await Department.findOne({
      where: { name: departmentName },
    });
    if (!department) {
      department = await Department.create({ name: departmentName });
    }

    const student = await Student.create({
      name: studentName,
      email: studentEmail,
      DepartmentId: department.id,
    });

    res.status(201).json({
      message: "Student and Department added successfully",
      department,
      student,
    });
  } catch (error) {
    console.error("Error adding values:", error);
    res
      .status(500)
      .json({ message: "Error adding values", error: error.message });
  }
};

const getValuesFromStudentAndDepartmentTable = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: {
        model: Department,
        attributes: ["id", "name"],
      },
    });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    res.status(200).json({
      message: "Students with their departments fetched successfully",
      data: students,
    });
  } catch (error) {
    console.error("Error fetching values:", error);
    res
      .status(500)
      .json({ message: "Error fetching values", error: error.message });
  }
};

module.exports = {
  getAllStudents,
  addStudent,
  addValuesToStudentAndDepartmentTable,
  getValuesFromStudentAndDepartmentTable,
};
