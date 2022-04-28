const router = require('express').Router()
const { models: { Product } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(await Product.findAll())
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.send(product)
  } catch (ex) {
    next(ex)
  }
})
