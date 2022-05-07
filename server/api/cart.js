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
// STANNIE: likewise, you can create an isAdmin middleware to check whether the user is an admin

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await Order.findOne({
      where: { userId: user.id, isCart: true },
      include: [{ model: LineItem, include: { model: Product } }],
    });
    res.send(cart);
  } catch (ex) {
    next(ex);
    console.log(ex);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    //console.log(req.body);
    const user = await User.findByToken(req.headers.authorization);
    const order = await Order.findOne({
      where: { userId: user.id, isCart: true },
    });
    // Create new order if cart is empty
    if (!order) {
      const newOrder = await Order.create({
        isCart: true,
        userId: user.id,
      });
      console.log("New Order", newOrder);
      const lineItem = await LineItem.create({
        ...req.body,
        orderId: newOrder.id,
      });
      res.status(201).send(lineItem);
      return;
    }
    // Check if order already has lineitem
    const existingLineItem = await LineItem.findOne({
      where: { orderId: order.id, productId: req.body.productId }
    });
    console.log("Existing line", existingLineItem);
    if (existingLineItem) {
      await LineItem.update({
        quantity: existingLineItem.quantity + req.body.quantity,
        cost: Number(existingLineItem.cost) + Number(req.body.quantity * req.body.cost)
      },
      {
        where: { id: existingLineItem.id }
      })
      res.status(201).send(existingLineItem);
      return;
    }
    // Create new LineItem if cart already exists and cart doesn't have product already
    const lineItem = await LineItem.create({ ...req.body, orderId: order.id });
    res.status(201).send(lineItem);
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:lineitemId/:quantity", isLoggedIn, async (req, res, next) => {
  try {
    console.log("delete route!");
    const lineItem = await LineItem.findByPk(req.params.lineitemId);
    await lineItem.destroy();
    res.send(lineItem);
    //res.json(await req.user.deleteFromCart(req.params.productId, req.params.quantity));
  } catch (ex) {
    next(ex);
  }
});
