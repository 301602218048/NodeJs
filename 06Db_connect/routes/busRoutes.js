const express = require("express");
const busController = require("../controllers/busController");
const router = express.Router();

router.get("/available/:seats", busController.getAvailableSeats);
router.get("/:id/bookings", busController.getBookingsofBusById);
router.post("/", busController.addBus);

module.exports = router;
