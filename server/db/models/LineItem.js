const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineitem", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  cost: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = LineItem;
