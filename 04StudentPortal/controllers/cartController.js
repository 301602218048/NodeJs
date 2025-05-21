const u = require("./userController");
const carts = [];

const fetchCart = (req, res) => {
  const id = req.params.userid;
  if (id <= carts.length) {
    const items = carts[id - 1].product;
    console.log(items);
    res.send(`Fetching cart for user with ID: ${id}`);
  } else {
    res.send("Cart not found");
  }
};

const addToCart = (req, res) => {
  const id = req.params.userid;
  if (id <= carts.length) {
    const product = req.body.product;
    carts[id - 1].product.push(product);
    res.send(`Adding product to cart for user with ID: ${id}`);
  } else if (id <= u.users.length) {
    const obj = {
      id,
      product: [req.body.product],
    };
    carts.push(obj);
    res.send(`Adding product to cart for user with ID: ${id}`);
  } else {
    res.send("Cart not found");
  }
};

module.exports = { fetchCart, addToCart };
