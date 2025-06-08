const Expense = require("../models/expense");

const addExpense = async (req, res) => {
  try {
    const { amount, category, desc } = req.body;
    const expense = await Expense.create({
      amount: amount,
      description: desc,
      category: category,
      userId: req.user.id,
    });
    res.status(201).json({
      msg: `Amount for ${category} successfully added`,
      success: true,
      data: expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, success: false });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const expense = await Expense.findAll({ where: { userId: req.user.id } });
    if (expense.length == 0) {
      res.status(404).json({ msg: "No expense in database", success: false });
      return;
    }
    res.status(200).json({
      msg: "Here is the list of all expenses",
      success: true,
      data: expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, success: false });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.destroy({
      where: { id: id, userId: req.user.id },
    });
    if (!expense) {
      res.status(404).json({ msg: "expense not found", success: false });
      return;
    }
    res
      .status(200)
      .json({ msg: `Expense with id ${id} has been deleted`, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, success: false });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
};
