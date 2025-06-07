const express = require("express");
const expenseController = require("../controllers/expenseController");
const router = express.Router();

router.get("/", expenseController.getAllExpense);
router.post("/", expenseController.addExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
