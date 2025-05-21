const express = require("express");
const u = require("../controllers/userController");
const router = express.Router();

router.get("/", u.fetchUser);

router.get("/:id", u.fetchUserById);

router.post("/", u.addUser);

module.exports = router;
