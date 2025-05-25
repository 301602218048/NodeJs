const db = require("../utils/db-connection");

const addBus = (req, res) => {
  const { busNumber, totalSeats, availableSeats } = req.body;
  const insertQuery =
    "insert into Buses (busNumber,totalSeats,availableSeats) values (?,?,?)";
  db.execute(insertQuery, [busNumber, totalSeats, availableSeats], (err) => {
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }
    console.log("value added to buses table");
    res.status(200).send(`Bus number ${busNumber} has been added`);
  });
};

const getAvailableSeats = (req, res) => {
  const minSeat = req.params.seats;
  const searchQuery = "select * from Buses where availableSeats > ?";
  db.execute(searchQuery, [minSeat], (err, result) => {
    console.log(result);
    if (err) {
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }
    const busList = result.map((b) => b.busNumber);
    console.log(busList);
    res
      .status(200)
      .send(
        `Here is the list of Buses with available seats more than ${minSeat} - ${busList}`
      );
  });
};

module.exports = {
  addBus,
  getAvailableSeats,
};
