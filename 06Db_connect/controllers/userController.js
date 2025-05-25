const db = require("../utils/db-connection");

const addUser = (req, res) => {
  const { name, email } = req.body;
  const insertQuery = "insert into Users (name,email) values (?,?)";
  db.execute(insertQuery, [name, email], (err) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }
    console.log("value added to users table");
    res.status(200).send(`User with name ${name} has been added`);
  });
};

const getAllUser = (req, res) => {
  const searchQuery = "select * from Users";
  db.execute(searchQuery, (err, result) => {
    console.log(result);
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }
    const userList = result.map((r) => r.name);
    res.status(200).send(`Here is the list of Users - ${userList}`);
  });
};

module.exports = {
  addUser,
  getAllUser,
};
