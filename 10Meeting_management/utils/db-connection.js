const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "meetingdb",
  "root",
  process.env.DATABASE_PSWD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database established");
  } catch (error) {
    console.log(error);
  }
})();

module.exports = sequelize;
