const express = require("express");
const expenseController = require("../controllers/expenseController");
const userAuth = require("../middlewares/auth");
const router = express.Router();

router.get("/", userAuth.authenticate, expenseController.getAllExpense);
router.get(
  "/paginate",
  userAuth.authenticate,
  expenseController.getPageExpense
);
router.post("/", userAuth.authenticate, expenseController.addExpense);
router.delete("/:id", userAuth.authenticate, expenseController.deleteExpense);

module.exports = router;
