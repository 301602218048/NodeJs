const express = require("express");
const home = require("./routes/home");
const user = require("./routes/userRoutes");
const product = require("./routes/productRoutes");
const cart = require("./routes/cartRoutes");

const app = express();

app.use(express.json());
app.use("/", home);
app.use("/users", user.router);
app.use("/products", product);
app.use("/carts", cart);
app.use((req, res) => {
  res.status(404).send("404-Page Not Found");
});

const port = 4000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
