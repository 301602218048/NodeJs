const express = require("express");
const passwordController = require("../controllers/passwordController");
const router = express.Router();

router.post("/forgotpassword", passwordController.sendResetLink);

module.exports = router;
