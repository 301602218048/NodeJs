const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.get("/", studentController.getAllStudents);
router.post("/", studentController.addStudent);
router.get(
  "/getfromstudentanddept",
  studentController.getValuesFromStudentAndDepartmentTable
);
router.post(
  "/addtostudentanddept",
  studentController.addValuesToStudentAndDepartmentTable
);

module.exports = router;
