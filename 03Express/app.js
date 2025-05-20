const express = require("express");
const app = express();

app.get("/welcome/:username", (req, res) => {
  const name = req.params.username;
  const role = req.query.role;
  res.send(`Welcome ${name}, your role is ${role}`);
});

app.use((req, res) => {
  res.status(404).send(`<h1>404-Page Not Found</h1>`);
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
