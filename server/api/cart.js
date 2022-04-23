const router = require("express").Router();
const {
  models: { Order, User, LineItem },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log(user);
    res.send(
      await Order.findOne({
        where: { userId: user.id, isCart: true },
        include: [{ model: LineItem }],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

// router.get('/lineitems', async (req, res, next) => {
//     try {
//         const user = await User.findByToken(req.headers.authorization)
//         const order = await Order.findOne({
//             where: { userId: user.id, isCart: true }
//         })
//        res.send(await LineItem.findAll({
//            where: { orderId: order.id }
//        }))
//      } catch (ex) {
//         next(ex)
//      }
// })
