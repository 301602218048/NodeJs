const productService = require("../services/productService");

const fetchProduct = (req, res) => {
  const products = productService.getAllProducts();
  if (products.length > 0) {
    console.log(products);
    res.send("Fetching all products");
  } else {
    res.send("No product in productList");
  }
};

const fetchProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = productService.getProductById(id);
  if (product) {
    console.log(product);
    res.send(`Fetching product with ID: ${id}`);
  } else {
    res.send("Product not found");
  }
};

const addProduct = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).send("Product name is required");
  }
  const product = productService.addProduct(name);
  res.send(`Added new product: ${product.name}`);
};

module.exports = { fetchProduct, fetchProductById, addProduct };
