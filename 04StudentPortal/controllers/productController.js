const productService = require("../services/productService");
const { sendErrorResponse, sendResponse } = require("../utils/response");

const fetchProduct = (req, res) => {
  const products = productService.getAllProducts();
  if (products.length > 0) {
    console.log(products);
    return sendResponse(res, "Fetching all products", 200);
  } else {
    return sendErrorResponse(res, {
      message: "No product in productList",
      statusCode: 404,
    });
  }
};

const fetchProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = productService.getProductById(id);
  if (product) {
    console.log(product);
    return sendResponse(res, `Fetching product with ID: ${id}`, 200);
  } else {
    return sendErrorResponse(res, {
      message: "Product not found",
      statusCode: 404,
    });
  }
};

const addProduct = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return sendErrorResponse(res, {
      message: "Product name is required",
      statusCode: 400,
    });
  }
  const product = productService.addProduct(name);
  return sendResponse(res, `Added new product: ${product.name}`, 200);
};

module.exports = { fetchProduct, fetchProductById, addProduct };
