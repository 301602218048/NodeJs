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
    res.status(500).json({ msg: error.message, data: null });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const expense = await Expense.findAll();
    if (expense.length == 0) {
      res.status(404).json({ msg: "No expense in database", data: null });
      return;
    }
    res.status(200).json({
      msg: "Here is the list of all expenses",
      data: expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findByPk(id);
    if (!expense) {
      res.status(404).json({ msg: "expense not found", data: null });
      return;
    }
    res.status(200).json({
      msg: `Here is the expense of id ${id}`,
      data: expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

const editExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, category, desc } = req.body;
    const expense = await Expense.findByPk(id);
    if (!expense) {
      res.status(404).json({ msg: "expense not found", data: null });
      return;
    }
    expense.amount = amount;
    expense.description = desc;
    expense.category = category;
    await expense.save();
    res
      .status(200)
      .json({ msg: "expense updated successfully", data: expense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.destroy({ where: { id: id } });
    if (!expense) {
      res.status(404).json({ msg: "expense not found", data: null });
      return;
    }
    res
      .status(200)
      .json({ msg: `Expense with id ${id} has been deleted`, data: null });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, data: null });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  getExpenseById,
  editExpense,
};
