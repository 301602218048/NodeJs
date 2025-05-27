const express = require("express");
const expenseController = require("../controllers/expenseController");
const router = express.Router();

router.get("/", expenseController.getAllExpense);
router.get("/:id", expenseController.getExpenseById);
router.post("/", expenseController.addExpense);
router.put("/:id", expenseController.editExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
