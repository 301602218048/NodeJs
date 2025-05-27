const express = require("express");
const courseController = require("../controllers/courseContrtoller");
const router = express.Router();

// router.get("/", courseController);
router.post("/", courseController.addCourse);
router.get("/addStudentCourses", courseController.addStudentsToCourses);

module.exports = router;
