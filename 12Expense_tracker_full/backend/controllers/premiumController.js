const Expense = require("../models/expense");
const Users = require("../models/user");
const sequelize = require("../utils/db-connection");

const showLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Expense.findAll({
      attributes: [
        "userId",
        [sequelize.fn("SUM", sequelize.col("amount")), "totalExpense"],
      ],
      group: ["userId"],
      order: [[sequelize.fn("SUM", sequelize.col("amount")), "DESC"]],
      include: {
        model: Users,
        attributes: ["name"],
      },
    });
    if (!leaderboard || leaderboard.length === 0) {
      return res.status(404).json({ msg: "Not found", success: false });
    }
    res.status(200).json({
      msg: "Current Leaderboard",
      leaderboard,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
};

module.exports = {
  showLeaderboard,
};
