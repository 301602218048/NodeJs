const express = require("express");
const app = express();

app.get("/orders", (req, res) => {
  res.send("Here is the list of all orders.");
});

app.get("/users", (req, res) => {
  res.send("Here is the list of all users");
});

app.post("/orders", (req, res) => {
  res.send("A new order has been created.");
});

app.post("/users", (req, res) => {
  res.send("A new user has been added.");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
