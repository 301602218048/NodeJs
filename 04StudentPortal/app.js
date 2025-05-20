const express = require("express");
const home = require("./routes/home");
const student = require("./routes/student");
const course = require("./routes/course");

const app = express();

// app.use(express.json());
app.use("/", home);
app.use("/students", student);
app.use("/courses", course);
app.use((req, res) => {
  res.status(404).send("404-Page Not Found");
});

const port = 4000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
