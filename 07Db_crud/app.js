const express = require("express");
const db = require("./utils/dbConnection");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

//models
require("./models");

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("server running...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
