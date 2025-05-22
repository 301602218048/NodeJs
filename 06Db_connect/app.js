const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DATABASE_PSWD,
  database: "testdb",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Database connection has been established");

  const creationQuery = `create table Students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20)
  )`;

  connection.execute(creationQuery, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Table is created");
  });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("server running...");
});
