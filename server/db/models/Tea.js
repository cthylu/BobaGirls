const Sequelize = require('sequelize')
const db = require('../db')

const Tea = db.define('tea', {
  teaname: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Tea