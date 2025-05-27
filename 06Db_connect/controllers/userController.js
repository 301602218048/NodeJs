const Users = require("../models/user");
const Buses = require("../models/bus");
const Bookings = require("../models/booking");

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await Users.create({
      name: name,
      email: email,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await Users.findAll();
    if (user.length == 0) {
      res.status(404).json({ msg: "No User in Database" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingsofUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Bookings.findAll({
      where: {
        UserId: id,
      },
      include: Buses,
    });
    if (!booking) {
      res.status(404).json({ msg: "Booking not found" });
      return;
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  getAllUser,
  getBookingsofUserById,
};
