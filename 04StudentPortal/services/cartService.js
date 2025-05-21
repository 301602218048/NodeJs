const carts = [];

const getCartById = (id) => {
  return carts.find((c) => c.id === id);
};

const addToCart = (prod) => {
  const obj = {
    id: carts.length + 1,
    product: [prod],
  };
  carts.push(obj);
  return obj;
};

module.exports = { getCartById, addToCart };
