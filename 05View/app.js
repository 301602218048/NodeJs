const express = require("express");
const product = require("./routes/productRoute");

const app = express();

app.use("/api/products", product);
app.use((req, res) => {
  res.status(404).send("404-Page Not Found");
});

const port = 4000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
