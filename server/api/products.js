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

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(product)
    console.log(req.params.id)
  } catch (ex) {
    next(ex)
  }
})
