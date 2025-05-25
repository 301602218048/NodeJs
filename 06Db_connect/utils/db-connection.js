const mysql = require("mysql2");
require("dotenv").config();

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

  //create user table
  const userCreationQuery = `create table IF NOT EXISTS Users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255)
    )`;

  connection.execute(userCreationQuery, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Users table created");
  });

  //create buses table
  const busCreationQuery = `create table IF NOT EXISTS Buses(
      id INT AUTO_INCREMENT PRIMARY KEY,
      busNumber VARCHAR(25),
      totalSeats INT,
      availableSeats INT
    )`;

  connection.execute(busCreationQuery, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Buses table created");
  });

  //create bookings table
  const bookingCreationQuery = `create table IF NOT EXISTS Bookings(
      id INT AUTO_INCREMENT PRIMARY KEY,
      seatNumber INT
    )`;

  connection.execute(bookingCreationQuery, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Bookings table created");
  });

  //create payments table
  const paymentCreationQuery = `create table IF NOT EXISTS Payments(
      id INT AUTO_INCREMENT PRIMARY KEY,
      amountPaid INT,
      paymentStatus VARCHAR(255)
    )`;

  connection.execute(paymentCreationQuery, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log("Payments table created");
  });
});

module.exports = connection;
