const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalCost: {
    type: Sequelize.INTEGER
  },
  isCart: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Order