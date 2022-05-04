const router = require("express").Router();
const {
  models: { Order, User, LineItem, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const orders = await Order.findAll({
      where: { userId: user.id, isCart: false }
    });
    res.send(orders);
  } catch (ex) {
    next(ex);
    console.log(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const orders = await Order.findAll({
      where: { userId: user.id, isCart: false },
      include: [{ model: LineItem, include: { model: Product } }],
    });
    res.send(orders)
  } catch (ex) {
    next(ex);
  }
});