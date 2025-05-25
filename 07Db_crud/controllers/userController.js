const db = require("../utils/dbConnection");

const addEntries = (req, res) => {
  const { email, name } = req.body;
  const insertQuery = "insert into students (email, name) values (?,?)";
  db.execute(insertQuery, [email, name], (err) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }

    console.log("Value has been added");
    res.status(200).send(`Student with name ${name} has successfully added`);
  });
};

const editEntries = (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  const updateQuery = "update students set name=?, email=? where id=?";
  db.execute(updateQuery, [name, email, id], (err, result) => {
    if (result.affectedRows == 0) {
      res.status(404).send("student not found");
      db.end();
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

const deleteEntries = (req, res) => {
  const id = req.params.id;
  const deleteQuery = "delete from students where id=?";
  db.execute(deleteQuery, [id], (err, result) => {
    if (result.affectedRows == 0) {
      res.status(404).send("student not found");
      db.end();
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
  addEntries,
  editEntries,
  deleteEntries,
};
