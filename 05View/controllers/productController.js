const path = require("path");

const fetchProducts = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "product.html"));
};

module.exports = fetchProducts;
