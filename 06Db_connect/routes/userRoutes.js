const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUser);
router.get("/:id/bookings", userController.getBookingsofUserById);
router.post("/", userController.addUser);

module.exports = router;
