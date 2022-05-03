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
    const cart = await Order.findAll({
      where: { userId: user.id, isCart: true },
      include: [{ model: LineItem, include: { model: Product } }],
    });

    // const cart = await Order.findOne({
    //   where: { userId: user.id, isCart: true },
    //   include: [{ model: LineItem, include: { model: Product } }]
    // })
    console.log(cart, "api route");
    res.send(cart);
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

// router.post("/", isLoggedIn, async (req, res, next) => {
//   try {
//     console.log("post route!");
//     const lineItem = await LineItem.create(req.body);
//     res.status(201).send(lineItem);
//   } catch (ex) {
//     next(ex);
//   }
// });

router.post("/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.json(await req.user.addToCart(req.body.productId, req.bodyquantity));
    // const product = await Product.findByPk(req.params.productId);
    // res.status(201).send(await Product.create(req.body));
  } catch (e) {
    // else {
    //   res.sendStatus(404);
    // }
    next(e);
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
