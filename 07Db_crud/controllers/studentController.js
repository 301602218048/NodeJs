const db = require("../utils/dbConnection");

const getAllStudents = (req, res) => {
  const searchQuery = "select * from Students";
  db.execute(searchQuery, (err, result) => {
    if (result.length == 0) {
      res.status(404).send("No student in database");
      return;
    }
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }
    console.log("search all students executed");
    res.status(200).send(result);
  });
};

const getStudentById = (req, res) => {
  const id = req.params.id;
  const searchQuery = "select * from Students where id=?";
  db.execute(searchQuery, [id], (err, result) => {
    if (result.length == 0) {
      res.status(404).send("student not found");
      return;
    }
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }
    console.log("search student by ID executed");
    res.status(200).send(result);
  });
};

const addStudent = (req, res) => {
  const { name, email, age } = req.body;
  const insertQuery = "insert into Students (name,email,age) values (?,?,?)";
  db.execute(insertQuery, [name, email, age], (err) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }

    console.log("Value has been added");
    res.status(200).send(`Student with name ${name} is successfully added`);
  });
};

const editStudent = (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  const updateQuery = "update Students set name=?, email=? where id=?";
  db.execute(updateQuery, [name, email, id], (err, result) => {
    if (result.affectedRows == 0) {
      res.status(404).send("student not found");
      return;
    }
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }
    console.log("student updated");
    res.status(200).send(`Student with id ${id} has been updated`);
  });
};

const deleteStudent = (req, res) => {
  const id = req.params.id;
  const deleteQuery = "delete from Students where id=?";
  db.execute(deleteQuery, [id], (err, result) => {
    if (result.affectedRows == 0) {
      res.status(404).send("student not found");
      return;
    }
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }
    console.log("student deleted");
    res.status(200).send(`Student with id ${id} has been deleted`);
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  editStudent,
  deleteStudent,
};
