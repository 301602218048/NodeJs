const express = require("express");
const db = require("./utils/db-connection");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const cors = require("cors");

//models
require("./models");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes);

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
