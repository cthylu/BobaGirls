const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineitem', {
    quantity: {
        type: Sequelize.INTEGER
    },
    cost: {
        type: Sequelize.INTEGER
    } 


})

module.exports = LineItem