const Sequelize = require("sequelize");
const db = require("../db");

const CheckOut = db.define("checkout", {
    firstname: Sequelize.STRING(50),
    lastname: Sequelize.STRING(50),
    address: Sequelize.STRING(50),
    city: Sequelize.STRING(50),
    state: Sequelize.STRING(2),
    zipcode: Sequelize.INTEGER(5),
});

module.exports = CheckOut;
