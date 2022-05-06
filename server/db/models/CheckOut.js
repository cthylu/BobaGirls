const Sequelize = require("sequelize");
const db = require("../db");

const CheckOut = db.define("checkout", {
  firstname: Sequelize.STRING(50),
  lastname: Sequelize.STRING(50),
  email: Sequelize.TEXT,
  address: Sequelize.STRING(50),
  city: Sequelize.STRING(50),
  state: Sequelize.STRING(20),
  zipcode: Sequelize.INTEGER,
});

module.exports = CheckOut;
