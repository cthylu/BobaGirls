const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
    console.log(req.params.id);
  } catch (ex) {
    next(ex);
  }
});

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

router.post("/cart", token, async (req, res, next) => {
  try {
    res.json(await req.user.addToCart(req.body.productId, req.body.quantity));
    // const product = await Product.findByPk(req.params.productId);
    // res.status(201).send(await Product.create(req.body));
  } catch (e) {
    // else {
    //   res.sendStatus(404);
    // }
    next(e);
  }
});

router.delete("/:id", token, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
	      await product.destroy();
	    } else {
	      res.sendStatus(404);
	    }
	    res.sendStatus(204);
    } catch (e) {
    next(e);
  }
});

router.post("/", token, async (req ,res, next) => {
  try {
    const { name, price, description, imageUrl } = req.body
    const product = await Product.create({
       name,
       imageUrl,
       description,
       price
    })
    return res.json(product)
  } catch (e) {
    next (e)
  }
})

