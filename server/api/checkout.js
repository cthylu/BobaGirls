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

router.get("/:id", token, async (req, res, next) => {
  try {
    const checkOut = await CheckOut.findByPk(req.body);
    res.send(checkOut).status(204);
  } catch (e) {
    next(e);
  }
});



router.post("/", token, async (req, res, next) => {
  try {
    res.send(
      await req.user.User(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          creditCard: req.body.creditCard,
          address: req.body.address,
          state: req.body.state,
          city: req.body.city,
          zipCode: req.body.zipCode,
        }.status(204)
      )
    );
  } catch (e) {
    next(e);
  }
});
