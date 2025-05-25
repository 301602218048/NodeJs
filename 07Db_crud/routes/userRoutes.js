const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/add", userController.addEntries);
router.put("/edit/:id", userController.editEntries);
router.delete("/delete/:id", userController.deleteEntries);

module.exports = router;
