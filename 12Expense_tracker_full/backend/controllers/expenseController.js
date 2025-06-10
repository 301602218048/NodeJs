const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../utils/db-connection");

const addExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { amount, category, desc } = req.body;
    const expense = await Expense.create(
      {
        amount: parseInt(amount),
        description: desc,
        category: category,
        userId: req.user.id,
      },
      { transaction: t }
    );

    const user = await User.findByPk(req.user.id, { transaction: t });
    if (user.length === 0) {
      await t.rollback();
      return res.status(404).json({ msg: "User not found", success: false });
    }

    user.totalExpense += parseInt(amount);
    await user.save({ transaction: t });
    await t.commit();

    res.status(201).json({
      msg: `Amount for ${category} successfully added`,
      success: true,
      data: expense,
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
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
    const latestOrderStatus = req.user.orders?.[0]?.status;
    res.status(200).json({
      msg: "Here is the list of all expenses",
      success: true,
      data: expense,
      premium: latestOrderStatus === "SUCCESS" ? true : false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message, success: false });
  }
};

const deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    const user = await User.findByPk(req.user.id, { transaction: t });
    const expense = await Expense.findByPk(id, { transaction: t });
    if (!expense || user.length === 0) {
      await t.rollback();
      res
        .status(404)
        .json({ msg: "expense or user not found", success: false });
      return;
    }
    await Expense.destroy(
      {
        where: { id: id, userId: req.user.id },
      },
      { transaction: t }
    );
    user.totalExpense -= expense.amount;
    await user.save({ transaction: t });
    await t.commit();
    res
      .status(200)
      .json({ msg: `Expense with id ${id} has been deleted`, success: true });
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).json({ msg: error.message, success: false });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
};
