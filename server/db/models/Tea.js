const Sequelize = require('sequelize')
const db = require('../db')

const Tea = db.define('tea', {
    teaname: {
        type: Sequelize.STRING
    }
})

module.exports = Tea