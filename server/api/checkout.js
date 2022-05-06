const router = require("express").Router();
const {
  models: { Order, CheckOut, User },
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
    const CheckOut = await CheckOut.findByPk(req.body);
    res.send(CheckOut);
  } catch (e) {
    next(e);
  }
});



router.post("/", token, async (req, res, next) => {
  try {
    res.send(
      await req.user.CheckOut(
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          address: req.body.address,
          state: req.body.state,
          city: req.body.city,
          zipcode: req.body.zipcode,
        }.status(204)
      )
    );
  } catch (e) {
    next(e);
  }
});
