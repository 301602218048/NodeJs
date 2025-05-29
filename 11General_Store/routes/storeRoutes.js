const express = require("express");
const storeController = require("../controllers/storeController");
const router = express.Router();

router.get("/", storeController.getAllItems);
router.get("/:id", storeController.getItemById);
router.post("/", storeController.addItem);
router.delete("/:id", storeController.deleteItem);
router.put("/:id", storeController.editItem);

module.exports = router;
