const Bus = require("../models/bus");
const { Op } = require("sequelize");

const addBus = async (req, res) => {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;
    const bus = await Bus.create({
      busNumber,
      totalSeats,
      availableSeats,
    });
    res.status(200).send(`Bus with number ${busNumber} is successfully added`);
  } catch (error) {
    res.status(500).send("Error encountered while adding bus");
  }
};

const getAvailableSeats = async (req, res) => {
  try {
    const minSeat = req.params.seats;
    const bus = await Bus.findAll({
      where: { availableSeats: { [Op.gt]: minSeat } },
    });
    if (!bus) {
      res.status(404).send("Bus not found");
    }
    res.status(200).send(bus);
  } catch (error) {
    res.status(500).send("Error encountered while fetching buses");
  }
};

module.exports = {
  addBus,
  getAvailableSeats,
};
