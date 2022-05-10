const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

const token = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
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

router.get("/:id", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username","firstName", "lastName", "email", "creditCard", "address", 'state', "city", "zipCode"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    console.log('req.params', req.params.id);
    const user = await User.findByPk(req.params.id);
    console.log(user);
    res.send(
      await User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        creditCard: req.body.creditCard,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city,
        zipCode: req.body.zipCode,
      })
    );
  } catch (e) {
    next(e);
  }
});
