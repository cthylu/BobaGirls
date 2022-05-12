const router = require("express").Router();
const {
  models: { Order, User, LineItem, Product },
} = require("../db");
module.exports = router;

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const orders = await Order.findAll({
      where: { userId: user.id, isCart: false },
      include: [{ model: LineItem, include: { model: Product } }],
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
    const orders = await Order.findByPk(req.params.id, {
      where: { userId: user.id, isCart: false },
      include: [{ model: LineItem, include: { model: Product } }],
    });
    res.send(orders);
  } catch (ex) {
    next(ex);
  }
});


router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    // const order = await Order.create({userId: req.user.id, time: req.body.time, isCart: false})
    const order = await Order.findByPk(req.params.id);
    order.isCart = false;
    order.time = req.body.time;
    await order.save();
    console.log(order)
    res.json(order);
  } catch (e) {
    next(e);
  }
});
