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
      where: { userId: user.id },
      include: [{ model: LineItem, include: { model: Product } }],
    });
    //console.log(orders, 'api route')
    res.send(orders);
  } catch (ex) {
    next(ex);
    console.log(ex);
  }
});

// router.delete('/:lineitemId', isLoggedIn, async (req, res, next) => {
//     try {
//       console.log("delete route!");
//       res.json(await req.user.deleteFromCart(req.params.productId));
//     } catch (e) {
//       next(e);
//     }
// });

router.delete("/:productId/:quantity", isLoggedIn, async (req, res, next) => {
  try {
    console.log("delete route!");
    res.json(
      await req.user.deleteFromCart(req.params.productId, req.params.quantity)
    );
  } catch (ex) {
    next(ex);
  }
});
