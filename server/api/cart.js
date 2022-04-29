const router = require('express').Router()
const { models: { Order, User, LineItem, Product } } = require('../db')
module.exports = router

const isLoggedIn = async(req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization)
    next()
  }
  catch(ex) {
    next(ex)
  }
}

router.get('/', async (req, res, next) => {
    try {
      const user = await User.findByToken(req.headers.authorization)
      const cart = await Order.findAll({
          where: { userId: user.id },
          include: [{ model: LineItem, include: { model: Product } }]
      })
        
      // const cart = await Order.findOne({
      //   where: { userId: user.id, isCart: true },
      //   include: [{ model: LineItem, include: { model: Product } }]
      // })
      console.log(cart, 'api route')
      res.send(cart)
    } catch (ex) {
      next(ex)
      console.log(ex)
    }
})

// router.delete('/:lineitemId', isLoggedIn, async (req, res, next) => {
//     try {
//       console.log("delete route!");
//       res.json(await req.user.deleteFromCart(req.params.productId));
//     } catch (e) {
//       next(e);
//     }
// });

router.delete('/:lineitemId/:quantity', isLoggedIn, async (req, res, next) => {
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
