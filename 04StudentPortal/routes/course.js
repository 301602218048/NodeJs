const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },
  { id: 2, name: "Backend", description: "Node.js, Express, MongoDB" },
];

router.get("/", (req, res) => {
  const nameList = courses.map((course) => course.name);
  const nameString = nameList.join(",");
  res.send(`Courses: ${nameString}`);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id <= courses.length) {
    const name = courses[id - 1].name;
    const desc = courses[id - 1].description;
    res.send(`Course: ${name}, Description: ${desc}`);
  } else {
    res.send("Course not found");
  }
});

module.exports = router;
