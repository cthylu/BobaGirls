//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

const Product = require("./models/Product");

const LineItem = require("./models/LineItem");

const Order = require("./models/Order");

const CheckOut = require("./models/CheckOut")


//associations could go here!

Order.belongsTo(User);
User.hasMany(Order);

Product.hasMany(LineItem);
LineItem.belongsTo(Product);

LineItem.belongsTo(Order);
Order.hasMany(LineItem);

module.exports = {
  db,
  models: {
    User,
    Product,
    LineItem,
    Order,
    CheckOut
  },
};
