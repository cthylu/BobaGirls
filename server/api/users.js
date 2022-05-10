const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

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

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/", token, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(
      await user.update(req.body)
    );
  } catch (e) {
    next(e);
  }
});