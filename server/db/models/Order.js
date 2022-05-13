const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  time: {
    type: Sequelize.TEXT,
  },
  orderNumber: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Order;
