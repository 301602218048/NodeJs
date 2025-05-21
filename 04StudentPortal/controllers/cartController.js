const userService = require("../services/userService");
const cartService = require("../services/cartService");
const { sendErrorResponse, sendResponse } = require("../utils/response");

const fetchCart = (req, res) => {
  const id = parseInt(req.params.userid);
  const items = cartService.getCartById(id);
  if (items) {
    console.log(items.product);
    return sendResponse(res, `Fetching cart for user with ID: ${id}`, 200);
  } else {
    return sendErrorResponse(res, {
      message: "Cart not found",
      statusCode: 404,
    });
  }
};

const addToCart = (req, res) => {
  const id = parseInt(req.params.userid);
  const item = cartService.getCartById(id);
  const user = userService.getUserById(id);
  const prod = req.body.product;
  if (!prod) {
    return sendErrorResponse(res, {
      message: "Product name is required",
      statusCode: 400,
    });
  }
  if (item) {
    item.product.push(prod);
    return sendResponse(
      res,
      `Adding product to cart for user with ID: ${id}`,
      200
    );
  } else if (user) {
    const productName = cartService.addToCart(prod);
    return sendResponse(
      res,
      `Adding ${productName.product} to cart for user with ID: ${id}`,
      200
    );
  } else {
    return sendErrorResponse(res, {
      message: "Cart not found",
      statusCode: 404,
    });
  }
};

module.exports = { fetchCart, addToCart };
