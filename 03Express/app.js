const express = require("express");
const category = require("./routes/category");
const product = require("./routes/product");

const app = express();

app.use((req, res, next) => {
  console.log(req.method, "request made to", req.url);
  next();
});

app.use("/categories", category);
app.use("/products", product);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
