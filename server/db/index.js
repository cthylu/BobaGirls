//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')

const Tea = require('./models/Tea')

const LineItem = require('./models/LineItem')

const Order = require('./models/Order')

//associations could go here!

Order.belongsTo(User)
User.hasMany(Order)

Tea.hasMany(LineItem)
LineItem.belongsTo(Tea)

LineItem.belongsTo(Order)
Order.hasMany(LineItem)


module.exports = {
  db,
  models: {
    User,
    Tea,
    LineItem,
    Order
  },
}
