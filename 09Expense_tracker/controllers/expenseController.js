const Expense = require("../models/expense");

const addExpense = async (req, res) => {
  try {
    const { amount, category, desc } = req.body;
    const expense = await Expense.create({
      amount: amount,
      description: desc,
      category: category,
    });
    res.status(201).json({
      msg: `Amount for ${category} successfully added`,
      data: expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const expense = await Expense.findAll();
    if (expense.length == 0) {
      res.status(404).json({ msg: "No user in database" });
      return;
    }
    res.status(200).json({
      msg: "Here is the list of all expenses",
      data: expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.destroy({ where: { id: id } });
    if (!expense) {
      res.status(404).json({ msg: "expense not found" });
      return;
    }
    res.status(200).json({ msg: `Expense with id ${id} has been deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
};
