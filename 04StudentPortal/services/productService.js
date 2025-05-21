const products = [];

const getAllProducts = () => {
  return products;
};

const getProductById = (id) => {
  return products.find((p) => p.id === id);
};

const addProduct = (name) => {
  const product = {
    id: products.length + 1,
    name,
  };
  products.push(product);
  return product;
};

module.exports = { getAllProducts, getProductById, addProduct };
