const Buses = require("../models/bus");
const Users = require("../models/user");
const Bookings = require("../models/booking");

const addBooking = async (req, res) => {
  try {
    const { userId, busId, seatNumber } = req.body;
    const user = await Users.findByPk(userId);
    if (!user) {
      res.status(404).json({ msg: "Input correct userId" });
      return;
    }
    const bus = await Buses.findByPk(busId);
    if (!bus) {
      res.status(404).json({ msg: "Input correct busId" });
      return;
    }
    const booking = await Bookings.create({
      UserId: userId,
      BusId: busId,
      seatNumber: seatNumber,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addBooking,
};
