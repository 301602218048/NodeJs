const express = require("express");
const meetingController = require("../controllers/meetingController");
const router = express.Router();

router.get("/", meetingController.getAllMeeting);
router.post("/", meetingController.addMeeting);
router.delete("/:id", meetingController.deleteMeeting);

module.exports = router;
