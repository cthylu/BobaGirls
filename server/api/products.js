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

const token = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

router.delete('/:id', token, async (req, res, next) => {
try {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.send(product).sendStatus(204);
  } else {
    res.sendStatus(404);
  }
} catch (e) {
  next(e);
}
});


