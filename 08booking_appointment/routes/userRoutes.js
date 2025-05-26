const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUser);
router.post("/", userController.addUser);
// router.put("/", userController);
router.delete("/:id", userController.deleteUser);

module.exports = router;
