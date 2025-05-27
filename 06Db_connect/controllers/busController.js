const Buses = require("../models/bus");
const Bookings = require("../models/booking");

const addBus = async (req, res) => {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;
    const bus = await Buses.create({
      busNumber,
      totalSeats,
      availableSeats,
    });
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAvailableSeats = async (req, res) => {
  try {
    const minSeat = req.params.seats;
    const bus = await Buses.findAll({
      where: { availableSeats: { [Op.gt]: minSeat } },
    });
    if (!bus) {
      res.status(404).json({ msg: "Bus not found" });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingsofBusById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Bookings.findByPk(id, { include: Buses });
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
  addBus,
  getAvailableSeats,
  getBookingsofBusById,
};
