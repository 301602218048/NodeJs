const express = require("express");
const studentController = require("../controllers/studentController");
const router = express.Router();

router.get("/", studentController.getValuesFromStudentAndDepartmentTable);
router.post("/", studentController.addValuesToStudentAndDepartmentTable);

module.exports = router;
