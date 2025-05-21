const products = [];

const fetchProduct = (req, res) => {
  if (products.length > 0) {
    console.log(products);
    res.send("Fetching all products");
  } else {
    res.send("No product in productList");
  }
};

const fetchProductById = (req, res) => {
  const id = req.params.id;
  if (id <= products.length) {
    const product = products[id - 1];
    console.log(product);
    res.send(`Fetching product with ID: ${id}`);
  } else {
    res.send("Product not found");
  }
};

const addProduct = (req, res) => {
  const obj = {
    id: products.length + 1,
    name: req.body.name,
  };
  products.push(obj);
  res.send("Adding a new product");
};

module.exports = { fetchProduct, fetchProductById, addProduct };
