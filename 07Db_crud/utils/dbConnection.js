const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("testdb", "root", process.env.DATABASE_PSWD, {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("connection to database has been created");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = sequelize;

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: process.env.DATABASE_PSWD,
//   database: "testdb",
// });

// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("Database connection has been established");

//   //create students table
//   const userCreationQuery = `create table IF NOT EXISTS Students(
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255),
//       email VARCHAR(255) UNIQUE,
//       age INT
//     )`;

//   connection.execute(userCreationQuery, (err) => {
//     if (err) {
//       console.log(err);
//       connection.end();
//       return;
//     }
//     console.log("Students table created");
//   });
// });

// module.exports = connection;
