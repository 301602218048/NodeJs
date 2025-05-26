const express = require("express");
const db = require("./utils/db-connection");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const port = 3000;
db.sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
