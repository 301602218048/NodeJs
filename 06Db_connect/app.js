const express = require("express");
const db = require("./utils/db-connection");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const app = express();

//models
require("./models");

app.use(express.json());
app.use("/users", userRoutes);
app.use("/buses", busRoutes);
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
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
