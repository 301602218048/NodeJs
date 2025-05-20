const express = require("express");
const router = express.Router();

const students = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

router.get("/", (req, res) => {
  const nameList = students.map((student) => student.name);
  const nameString = nameList.join(",");
  res.send(`Students: ${nameString}`);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id <= students.length) {
    const name = students[id - 1].name;
    res.send(`Student: ${name}`);
  } else {
    res.send("Student not found");
  }
});

module.exports = router;
