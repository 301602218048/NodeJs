const path = require("path");

const fetchProducts = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "product.html"));
};

const addProduct = (req, res) => {
  const body = req.body;
  res.json({ value: body.productName });
};

module.exports = { fetchProducts, addProduct };
