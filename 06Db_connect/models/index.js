const Buses = require("./bus");
const Users = require("./user");
const Bookings = require("./booking");

//user-booking(1:M) link
Users.hasMany(Bookings);
Bookings.belongsTo(Users);

//bus-booking(1:M) link
Buses.hasMany(Bookings);
Bookings.belongsTo(Buses);

module.exports = {
  Buses,
  Users,
  Bookings,
};
