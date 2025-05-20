const express = require("express");
const router = express.Router();

const bookList = [];

router.get("/", (req, res) => {
  bookList ? console.log(bookList) : console.log("No books in the library");
  res.send("Here is the list of books!");
});

router.post("/", (req, res) => {
  const name = req.body.name;
  console.log(name);
  bookList.push(name);
  res.send("Book has been added!");
});

module.exports = router;
