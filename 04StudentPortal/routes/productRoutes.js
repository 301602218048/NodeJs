const express = require("express");
const p = require("../controllers/productController");
const router = express.Router();

router.get("/", p.fetchProduct);

router.get("/:id", p.fetchProductById);

router.post("/", p.addProduct);

module.exports = router;
