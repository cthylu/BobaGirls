const router = require('express').Router()
const { models: { Tea }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(await Tea.findAll())
  } catch (err) {
    next(err)
  }
})
