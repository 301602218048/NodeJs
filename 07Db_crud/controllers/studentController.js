const db = require("../utils/dbConnection");
const Student = require("../models/students");

const getAllStudents = async (req, res) => {
  try {
    const student = await Student.findAll();
    if (student.length == 0) {
      res.status(404).send("No student in database");
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send("Server error");
  }
  // const searchQuery = "select * from Students";
  // db.execute(searchQuery, (err, result) => {
  //   if (result.length == 0) {
  //     res.status(404).send("No student in database");
  //     return;
  //   }
  //   if (err) {
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //     db.end();
  //     return;
  //   }
  //   console.log("search all students executed");
  //   res.status(200).send(result);
  // });
};

const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (!student) {
      res.status(404).send("Student not found");
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send("Server error");
  }

  // const id = req.params.id;
  // const searchQuery = "select * from Students where id=?";
  // db.execute(searchQuery, [id], (err, result) => {
  //   if (result.length == 0) {
  //     res.status(404).send("student not found");
  //     return;
  //   }
  //   if (err) {
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //     db.end();
  //     return;
  //   }
  //   console.log("search student by ID executed");
  //   res.status(200).send(result);
  // });
};

const addStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = await Student.create({
      name: name,
      email: email,
    });
    res.status(200).send(`Student with name ${name} is successfully added`);
  } catch (error) {
    res.status(500).send("Unable to make an entry");
  }

  // const { name, email, age } = req.body;
  // const insertQuery = "insert into Students (name,email,age) values (?,?,?)";
  // db.execute(insertQuery, [name, email, age], (err) => {
  //   if (err) {
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //     db.end();
  //     return;
  //   }

  //   console.log("Value has been added");
  //   res.status(200).send(`Student with name ${name} is successfully added`);
  // });
};

const editStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const id = req.params.id;

    const student = await Student.findByPk(id);
    if (!student) {
      res.status(404).send("Student not found");
    }
    student.name = name;
    student.email = email;
    await student.save();
    res.status(200).send("Student has been updated!");
  } catch (error) {
    res.status(500).send("Error encountered while updating");
  }

  // const { name, email } = req.body;
  // const id = req.params.id;
  // const updateQuery = "update Students set name=?, email=? where id=?";
  // db.execute(updateQuery, [name, email, id], (err, result) => {
  //   if (result.affectedRows == 0) {
  //     res.status(404).send("student not found");
  //     return;
  //   }
  //   if (err) {
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //     db.end();
  //     return;
  //   }
  //   console.log("student updated");
  //   res.status(200).send(`Student with id ${id} has been updated`);
  // });
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.destroy({
      where: {
        id: id,
      },
    });
    if (!student) {
      res.status(404).send("student not found");
    }
    res.status(200).send(`Student with id ${id} has been deleted`);
  } catch (error) {
    res.status(500).send("Error encountered while deleting");
  }
  // const id = req.params.id;
  // const deleteQuery = "delete from Students where id=?";
  // db.execute(deleteQuery, [id], (err, result) => {
  //   if (result.affectedRows == 0) {
  //     res.status(404).send("student not found");
  //     return;
  //   }
  //   if (err) {
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //     db.end();
  //     return;
  //   }
  //   console.log("student deleted");
  //   res.status(200).send(`Student with id ${id} has been deleted`);
  // });
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  editStudent,
  deleteStudent,
};
