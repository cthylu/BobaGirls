const router = require('express').Router()
const { models: { Tea , User}} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(await Tea.findAll())
  } catch (err) {
    next(err)
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
  const tea = await Tea.findByPk(req.params.id);
  if (tea) {
    await tea.destroy();
    res.send(tea).sendStatus(204);
  } else {
    res.sendStatus(404);
  }
} catch (e) {
  next(e);
}
});