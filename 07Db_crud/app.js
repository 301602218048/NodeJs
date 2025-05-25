const express = require("express");
const db = require("./utils/dbConnection");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("server running...");
});
