const express = require("express");
const bookingController = require("../controllers/bookingController");
const router = express.Router();

router.post("/", bookingController.addBooking);

module.exports = router;
