'use strict'

const { db, models: { User, Product, Order, LineItem } } = require('../server/db/')


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', isAdmin: true }),
    User.create({ username: 'murphy', password: '123' }),
    User.create({ username: 'ice', password: '123' }),
    User.create({ username: 'yingying', password: '123' }),
    User.create({ username: 'cathy', password: '123' }),
    User.create({ username: 'kim', password: '123' })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded users successfully`)

  // Creating Products
  const products = await Promise.all([
    Product.create({ name: 'Green Tea', price: 7.00, quantity: 50, key: 'tea', imageUrl: 'https://cdn.shopify.com/s/files/1/0376/6442/4071/products/Jasminecopycopy_1080x_568d6bac-fad6-46a8-a998-3fcbb56a58d5_1080x.jpg?v=1597931484', 
      description: `In the West, green tea is nowhere near as popular as black tea. Green tea is the most popular type of tea in Japan and in parts of China, and it is gaining popularity in the West. Depending on where they were grown, how they were processed, when they were harvested, etc., good green teas can have a range of tastes. Common descriptors for good quality green tea include: sweet, bittersweet, nutty, vegetal, buttery, floral, swampy, fruity, and oceanic. Steamed green teas tend to taste bittersweet (especially in the aftertaste), while other green teas tend to taste sweet.
      <br/> 
      Preparation: Many people who think they don't like green tea have simply never tried good green tea that has been prepared correctly. A common mistake in brewing green tea is using boiling water. While it's generally okay to use boiling water to make black tea, using boiling water for green tea can turn even the best leaves into a bitter, nasty mess. Most green teas are best when steeped at around 150 to 180 F, which is only simmering. It's also important to avoid steeping your green tea too long, as over-steeping will also make your green tea undrinkably bitter. Some teas (especially steamed Japanese green teas) should only be steeped for 20 or 30 seconds.`}),
    Product.create({ name: 'Jasmine Tea', price: 5.50, quantity: 50, key: 'tea', imageUrl: 'https://cdn.shopify.com/s/files/1/0376/6442/4071/products/Jasminecopycopy_1080x_568d6bac-fad6-46a8-a998-3fcbb56a58d5_1080x.jpg?v=1597931484', 
      description: `Jasmine tea generally refers to a tea that has been scented with jasmine flowers or flavorings. It is usually made with green tea and is not an herbal tea. Generally speaking, jasmine tea is only as healthy as the tea used to make it was before it was flavored. However, there is some added benefit in terms of the jasmine's relaxing scent, which researchers found was akin to the lavender's relaxing scent in terms of lowering heart rate. Additionally, jasmine flavoring may entice people to drink it more often than unflavored tea, and a tea you drink is much healthier for you than a tea that sits in your cupboard. Some people also claim that jasmine acts as an aphrodisiac... and just when you thought tea was tame! Please note that there is some danger associated with drinking large quantities of jasmine tea during pregnancy and that jasmine tea is best drunk in moderation. Also, while jasmine tea (like many other tea types) is claimed to increase metabolism, it is best to avoid drinking it on an empty stomach, as it is somewhat acidic and can cause stomach discomfort.
      <br/> 
      Preparation: Jasmine tea is usually best steeped with filtered water that is around 190 F (simmering, not boiling)—three minutes is usually plenty. About one teaspoon per cup of loose-leaf jasmine tea is good, but you can use less tea or more water if you are brewing jasmine pearls (which only take a few pearls per cup) or jasmine flowering tea (one "flower" is enough for a large mug or whole pot of tea).`}),
    Product.create({ name: 'Oolong Tea', price: 6.00, quantity: 50, key: 'tea', imageUrl: 'https://cdn.shopify.com/s/files/1/0376/6442/4071/products/roastedoolongcopycopy_1080x_f07824e4-28af-4155-8ca9-e2597a7e27a0_1080x.jpg?v=1597931239', 
      description: `Oolong tea, or wulong tea, is one of the five true tea types—along with white tea, green tea, black tea, and pu-erh tea— made from the leaves of the Camellia sinensis plant. The tea is classified as a Chinese tea and is one of the main tea exports from China. The term wulong in Chinese literally translates to "black dragon tea".  Oolong tea has long been used in traditional Chinese medicine as an herbal remedy for everything from stomach ailments to heart disease.
      <br/>
      Preparation: There are two methods to brew oolong tea: the traditional Chinese way and the western way. You can also brew oolong tea using oolong tea bags, but most tea experts believe the flavor of bagged teas to be inferior to loose leaf varieties. Whichever method you choose, follow these general guidelines when brewing oolong tea.
      First, bring water to 200-212 degrees Fahrenheit depending on your oolong variety. Lightly oxidized oolongs should brew at lower temperatures than heavily oxidized varieties.
      Then, use 2 tablespoons of loose leaf tea for every six ounces of water or one tea pearl if your oolong is sold in ball form.`}),
    Product.create({ name: 'Lavender Tea', price: 7.00, quantity: 50, key: 'tea', imageUrl: 'https://www.teasenz.com/media/catalog/product/cache/9e3b5f40fd15c0ce40198e6feb89fe1a/l/a/lavender_tea_3.jpg', 
      description: `Lavender tea offers a delicate flavor and aromatic fragrance that boasts extensive health benefits. Unearth the beauty of this floral plant and find out how drinking a cup of lavender can boost your health. Lavender tea boasts a distinctive flavor and aromatic fragrance. Lavender tea features hints of rosemary and mint. Some blends offer a smoky or woody flavor while others tend to be more floral and sweet. Lavender tea can also have hints of green apple, rose, and earthy notes similar to those found in green tea.
      <br/>
      Preparation: Lavender tea can be made using tea bags or loose flowers. The flower buds can be fresh from your garden or dried for added shelf life.
      We always recommend using loose tea blends rather than tea bags. Loose teas offer fresher flavor and tend to contain better quality flowers and buds than tea bag varieties. Pour 1 cup (250 mL) of water over 1/2 teaspoon of loose lavender buds, and let it steep for a few minutes.`}),
    Product.create({ name: 'Chamomile Tea', price: 5.00, quantity: 50, key: 'tea', imageUrl: 'https://i.ebayimg.com/images/g/4asAAOSwBOtY9LtK/s-l300.jpg', 
      description: `Chamomile tea is an herbal tea made from the flowers and buds of the chamomile plant from the daisy family Asteraceae. Chamomile tea is naturally caffeine-free, gluten-free, and a popular bedtime tea. It is known for its soothing and calming properties. The tea is brewed by infusing pure chamomile flowers in hot water. hamomile tea offers herbal and fruity notes with a refreshing, smooth finish. The taste of chamomile tea is often described as similar to a crisp apple. In fact, chamomile derives its name from the Greek words “chamaimelon,” which literally translate to 'ground apple' or 'earth apple'. Chamomile tea boats a light, airy taste with a sweet aromatic scent. The tea is light yellow in color, mimicking the look of gentle sunlight. The tea also boasts a range of health benefits that make it as good for you as it is tasty.
      <br/>
      Preparation: To brew fresh chamomile tea, simply place the flowers in hot water and steep for three to five minutes. Use a tea strainer to remove the flowers before drinking.
      Certified organic loose leaf teas tend to have better flavor and health benefits when compared to tea bags. That's usually because tea bags only contain broken pieces and dust of the healthy plants.
      Loose tea on the other hand contains the whole flowers, ensuring you get all the flavor and benefits from each brew. If you absolutely have to use a chamomile tea bag, opt for one that is large enough to let the flowers expand completely to infuse flavor.`, quantity: 50 }),
    Product.create({ name: 'Chrysanthemum Tea', price: 6.00, quantity: 50, key: 'tea', imageUrl: 'https://i.etsystatic.com/9720409/r/il/a1d102/1957718800/il_1588xN.1957718800_fm02.jpg', 
      description: `Chrysanthemums are flowering plants native to East Asia. These edible flowers are often used as a garden decoration and natural pest control, but they also have culinary applications. Yellow or white chrysanthemum flowers can be boiled to make an herbal tea with a range of health benefits.`, 
      preparation: `You can also make your own chrysanthemum tea at home. To prepare chrysanthemum tea at home, boil 0.2 ounces of dried chrysanthemum flowers in 3 cups of water. Let the tea steep for three to five minutes and enjoy plain or with light sweeteners like a bit of sugar or honey, to taste.`}),
    Product.create({ name: 'Rose Tea', price: 6.00, quantity: 50, key: 'tea', imageUrl: 'https://cdn.shopify.com/s/files/1/1093/4358/products/image_c6062786-2c18-41d5-8016-c3fbf936dc67_2000x.jpg?v=1611689073', 
      description: `Rose tea is an herbal tea that can be made from a variety of different parts of the rose plant including rose petals, rose buds, and rosehips. The tea is also often blended with true tea leaves such as green tea and black tea to make floral flavored teas. Rose tea blends are also combined with other herbal teas such as chamomile tea, hibiscus tea, and rooibos. Rose tea is a caffeine-free herbal tea that is a best seller thanks to its sweet, floral flavor. The tea contains vitamins and minerals as well as antioxidants that are beneficial for well-being. Try this herbal tea today and discover the different flavors or rose petal tea, rose hips tea, and rose bud tea.
      <br/>
      Preparation: Rose tea can be brewed using tea bags, loose tea, or fresh petals from your garden. Bring filtered or spring water to a rolling boil in a large teapot or electric kettle. Add in one teaspoon of rose petals or rose hips for every eight ounces of water. Steep the rose tea in the boiling water using an infuser for 5 to 7 minutes. If you are making an herbal tea blend with black tea or another strong true tea, limit the steeping time to 3 to 5 minutes. Remove the strainer from the hot water and pour the rose water tea into a teacup. Add sweetener if desired and enjoy.`}),
    Product.create({ name: 'Tapioca Pearls', price: 3.00, quantity: 50, key: 'topping', imageUrl: 'https://damnspicy.com/wp-content/uploads/2020/08/homemade-tapioca-pearls-5-480x270.jpg', 
      description: `Tapioca pearls are edible translucent spheres produced from tapioca, a starch extracted from the cassava root. Tapioca pearls make the unique ingredient of a bubble tea or boba tea drinks. They are about the size of pearls or small marbles, with the soft and chewy consistency of gummy candies. The pearls are opaque when raw and turned translucent after cooking. They need to be soaked for a considerable length of time before use in different food preparations. 
      <br/>
      1) Boil 10 cups of water for every 1 cup of tapioca pearls in a large pot. Add tapioca slowly into boiling pot and stir lightly. 
      2) Wait until tapioca floats to water surface. Cover pot. Cook in medium heat for 2-3 minutes. Turn off head and simmer for another 2-3 minutes (adjust time to soften tapioca to personal tastes). 
      3) Scoop out tapioca and let it rest in cold water for 20 seconds. Scoop out tapioca into dry bowl and mix in sugar or honey.` }),
    Product.create({ name: 'Strawberry Popping Boba', price: 6.50, quantity: 50, key: 'topping', imageUrl: 'https://image.made-in-china.com/202f0j00NItYwGjFEPqc/China-Popping-Boba-Production-Line.jpg', 
      description: `Strawberry popping pearls, also known as popping boba, are liquid-filled balls with the essence and goodness of strawberry with a juicy burst of flavor. A little smaller in size than the regular tapioca boba, popping pearls leave your taste buds satisfied with a gush of fruit flavor. The vibrant dark red color of the boba jelly balls makes your recipe look delicious. Our popping pearls will also help your food look creative and trendy that keep them coming back for more.
      <br/>
      Popping pearls are a simple and easy addition because there are no preparing or cooking required. Serve these popping boba straight from the jar!` }),
    Product.create({ name: 'Lychee Jelly', price: 7.00, quantity: 50, key: 'topping', imageUrl: 'https://tealiciouscafe.com/wp-content/uploads/2018/10/lychee-gelatin.jpg', 
      description: `Lychee jelly is a jiggly jelly dessert made from the tropical lychee fruit. Lychee jelly is sweet and slightly tart, with the floral, tropical flavor notes of the lychee fruit. The texture is solid yet soft, jiggly, and bouncy. It's often thicker than jellies made with gelatin.
      <br/>
      Lychee jelly is a simple and easy addition because there is no preparing or cooking required. Serve the lychee jelly straight from the jar!` }),
    Product.create({ name: 'Boba Girls Metal Straws (3 Pack, 10mm)', price: 15.00, quantity: 57, key: 'merchandise', imageUrl: 'https://m.media-amazon.com/images/I/41sbdOYwGnL._AC_.jpg', 
      description: `This Stainless Steel Straws Set is a reusable straw solution to replace disposable plastic straws. These steel straws are made from high quality 18/8 stainless steel with a safe, food grade, removable silicone flex tip. No more plastic - just your favorite drinks on the go.
      <br/>
      BPA Free
      Food-grade silicone and stainless steel construction
      Dishwasher safe
      Silicone straw tip for safe, comfortable sipping
      <br/>
      Parts: 3 2-piece 10mm straw (1 extender)
      Weight: .55 ounces (15.6 g)
      Size: 8.9" H x .39" W (226.1 mm H x 10 mm W)` }),
    Product.create({ name: 'Boba Girls 24oz Reusable Tumbler', price: 25.00, quantity: 300, key: 'merchandise', imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRUWMP9Xavmlk3UQnVZcDQIwj4hcko5NKzHOTju0xfB8KWCGc8SqPUFgca8WqGw299k0QYZsLI&usqp=CAE', 
      description: `A reusable tumbler cup equipped with a plastic boba straw so you can slurp 24oz of boba goodness. Designed from durable plastic with a double-wall design for a clean look, this 24-ounce plastic tumbler with straw is as stylish as it is useful. The lidded design helps prevent leaks and spills, while the included straw lets you take easy and refreshing sips of your favorite beverage. Whether used to sip your favorite cold beverage or looking for a standout gift, this tumbler makes the perfect pick.
      <br/>
      Size: 24 oz. 
      Material: 100% BPA free, plastic
      Note: Not dishwasher or microwave safe. Not to be used for hot drinks.` }),
    Product.create({ name: 'Boba Girls 24oz Mason Jar', price: 15.00, quantity: 300, key: 'merchandise', imageUrl: 'https://m.media-amazon.com/images/S/aplus-media/sc/8c460412-d464-47fb-a392-613699fd4d2b.__CR0,0,970,600_PT0_SX970_V1___.jpg', 
      description: `A reusable mason jar equipped with a metal boba straw so you can slurp 24oz of boba goodness. Designed from durable plastic with a double-wall design for a clean look, this 24-ounce plastic tumbler with straw is as stylish as it is useful. The lidded design helps prevent leaks and spills, while the included straw lets you take easy and refreshing sips of your favorite beverage. Whether used to sip your favorite cold beverage or looking for a standout gift, this tumbler makes the perfect pick.
      <br/>
      Size: 24 oz. 
      Material: 100% BPA free, plastic
      Note: Not dishwasher or microwave safe. Not to be used for hot drinks.` }),
    // Product.create({ name: '', price: 6.00, quantity: 50, imageUrl: '', 
    //   description: `` }),
  ])


  console.log(`seeded ${products.length} products`)
  console.log(`seeded products successfully`)

  // Creating Orders
  const orders = await Promise.all([
    Order.create({ totalCost: 2, userId: users[0].id, isCart: true }),
    Order.create({ totalCost: 6, userId: users[2].id, isCart: true }),
    Order.create({ totalCost: 5, userId: users[1].id, isCart: false })
  ])

  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded orders successfully`)

  // Creating LineItems
  const lineitems = await Promise.all([
    LineItem.create({ quantity: 1, cost: 3, productId: products[0].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[1].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[2].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[3].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[4].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[5].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[6].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[1].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 1, cost: 3, productId: products[2].id, orderId: orders[1].id }),
    LineItem.create({ quantity: 1, cost: 3, productId: products[3].id, orderId: orders[1].id }),
    LineItem.create({ quantity: 3, cost: 6, productId: products[2].id, orderId: orders[2].id }),
  ])

  console.log(`seeded ${lineitems.length} lineitems`)
  console.log(`seeded lineitems successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    products,
    orders,
    lineitems
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
