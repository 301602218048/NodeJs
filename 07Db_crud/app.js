const express = require("express");
const db = require("./utils/dbConnection");
const studentRoutes = require("./routes/studentRoutes");

//models
const studentModel = require("./models/students");

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

db.sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("server running...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
