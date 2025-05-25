const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.post("/", studentController.addStudent);
router.put("/:id", studentController.editStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
