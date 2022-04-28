const router = require('express').Router()
const { models: { Order, User, LineItem, Product } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization)
       const cart = await Order.findAll({
           where: { userId: user.id },
           include: [{ model: LineItem, include: { model: Product } }]
       })
        
    //    const currentCart = await Order.findOne({
    //       where: { userId: user.id, isCart: true },
    //       include: [{ model: LineItem, include: { model: Tea } }]
    //    })
       console.log(cart, 'api route')
       res.send(cart)
    } catch (ex) {
       next(ex)
       console.log(ex)
    }
})

// router.delete('/', async (req, res, next) => {
//     try {
//         const user = await User.findByToken(req.headers.authorization)
//         const cart = await Order.findAll({
//             where: {userId: user.id},
//             include: [{model: LineItem, include: {model: Tea}}]
//         })
//         if(cart) {
//             const deletedProduct = await LineItem.findAll({
//                 where: {
//                     teaId: req.body.teaId,
//                     orderId: cart.id 
//                 }
//             })
//             await deletedProduct[0].destroy()
//         }
//         res.json(cart)
//     } catch (ex) {
//         next(ex)
//     }
// })

// router.post('/', async (req, res, next) => {
//     try {

//     } catch (ex) {
//         next(ex)
//     }
// })

// router.get('/', async (req, res, next) => {
//     try {
//        const user = await User.findByToken(req.headers.authorization)
//        console.log(user)
//       res.send(await Order.findOne({
//           where: { userId: user.id, isCart: true },
//           include: [{ model: LineItem }]
//       }))
//     } catch (ex) {
//        next(ex)
//     }
// })

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