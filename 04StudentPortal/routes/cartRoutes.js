const express = require("express");
const c = require("../controllers/cartController");
const router = express.Router();

router.get("/:userid", c.fetchCart);

router.post("/:userid", c.addToCart);

module.exports = router;
