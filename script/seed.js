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
    User.create({ username: 'cody', password: '123' }),
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
    Product.create({ name: 'Green Tea', price: 7.00, quantity: 50, imageUrl: 'https://cdn.shopify.com/s/files/1/0376/6442/4071/products/Jasminecopycopy_1080x_568d6bac-fad6-46a8-a998-3fcbb56a58d5_1080x.jpg?v=1597931484', 
      description: `In the West, green tea is nowhere near as popular as black tea. Green tea is the most popular type of tea in Japan and in parts of China, and it is gaining popularity in the West. Depending on where they were grown, how they were processed, when they were harvested, etc., good green teas can have a range of tastes. Common descriptors for good quality green tea include: sweet, bittersweet, nutty, vegetal, buttery, floral, swampy, fruity, and oceanic. Steamed green teas tend to taste bittersweet (especially in the aftertaste), while other green teas tend to taste sweet.
      <br/> 
      Preparation: Many people who think they don't like green tea have simply never tried good green tea that has been prepared correctly. A common mistake in brewing green tea is using boiling water. While it's generally okay to use boiling water to make black tea, using boiling water for green tea can turn even the best leaves into a bitter, nasty mess. Most green teas are best when steeped at around 150 to 180 F, which is only simmering. It's also important to avoid steeping your green tea too long, as over-steeping will also make your green tea undrinkably bitter. Some teas (especially steamed Japanese green teas) should only be steeped for 20 or 30 seconds.`}),
    Product.create({ name: 'Jasmine Tea', price: 5.50, quantity: 50, imageUrl: 'https://cdn.shopify.com/s/files/1/0376/6442/4071/products/Jasminecopycopy_1080x_568d6bac-fad6-46a8-a998-3fcbb56a58d5_1080x.jpg?v=1597931484', 
      description: `Jasmine tea generally refers to a tea that has been scented with jasmine flowers or flavorings. It is usually made with green tea and is not an herbal tea. Generally speaking, jasmine tea is only as healthy as the tea used to make it was before it was flavored. However, there is some added benefit in terms of the jasmine's relaxing scent, which researchers found was akin to the lavender's relaxing scent in terms of lowering heart rate. Additionally, jasmine flavoring may entice people to drink it more often than unflavored tea, and a tea you drink is much healthier for you than a tea that sits in your cupboard. Some people also claim that jasmine acts as an aphrodisiac... and just when you thought tea was tame! Please note that there is some danger associated with drinking large quantities of jasmine tea during pregnancy and that jasmine tea is best drunk in moderation. Also, while jasmine tea (like many other tea types) is claimed to increase metabolism, it is best to avoid drinking it on an empty stomach, as it is somewhat acidic and can cause stomach discomfort.
      <br/> 
      Preparation: Jasmine tea is usually best steeped with filtered water that is around 190 F (simmering, not boiling)—three minutes is usually plenty. About one teaspoon per cup of loose-leaf jasmine tea is good, but you can use less tea or more water if you are brewing jasmine pearls (which only take a few pearls per cup) or jasmine flowering tea (one "flower" is enough for a large mug or whole pot of tea).`}),
    Product.create({ name: 'Oolong Tea', price: 6.00, quantity: 50, imageUrl: 'https://cdn.shopify.com/s/files/1/0376/6442/4071/products/roastedoolongcopycopy_1080x_f07824e4-28af-4155-8ca9-e2597a7e27a0_1080x.jpg?v=1597931239', 
      description: `Oolong tea, or wulong tea, is one of the five true tea types—along with white tea, green tea, black tea, and pu-erh tea— made from the leaves of the Camellia sinensis plant. The tea is classified as a Chinese tea and is one of the main tea exports from China. The term wulong in Chinese literally translates to "black dragon tea".  Oolong tea has long been used in traditional Chinese medicine as an herbal remedy for everything from stomach ailments to heart disease.
      <br/>
      Preparation: There are two methods to brew oolong tea: the traditional Chinese way and the western way. You can also brew oolong tea using oolong tea bags, but most tea experts believe the flavor of bagged teas to be inferior to loose leaf varieties. Whichever method you choose, follow these general guidelines when brewing oolong tea.
      First, bring water to 200-212 degrees Fahrenheit depending on your oolong variety. Lightly oxidized oolongs should brew at lower temperatures than heavily oxidized varieties.
      Then, use 2 tablespoons of loose leaf tea for every six ounces of water or one tea pearl if your oolong is sold in ball form.`}),
    Product.create({ name: 'Lavender Tea', price: 7.00, quantity: 50, imageUrl: 'https://www.teasenz.com/media/catalog/product/cache/9e3b5f40fd15c0ce40198e6feb89fe1a/l/a/lavender_tea_3.jpg', 
      description: `Lavender tea offers a delicate flavor and aromatic fragrance that boasts extensive health benefits. Unearth the beauty of this floral plant and find out how drinking a cup of lavender can boost your health. Lavender tea boasts a distinctive flavor and aromatic fragrance. Lavender tea features hints of rosemary and mint. Some blends offer a smoky or woody flavor while others tend to be more floral and sweet. Lavender tea can also have hints of green apple, rose, and earthy notes similar to those found in green tea.
      <br/>
      Preparation: Lavender tea can be made using tea bags or loose flowers. The flower buds can be fresh from your garden or dried for added shelf life.
      We always recommend using loose tea blends rather than tea bags. Loose teas offer fresher flavor and tend to contain better quality flowers and buds than tea bag varieties. Pour 1 cup (250 mL) of water over 1/2 teaspoon of loose lavender buds, and let it steep for a few minutes.`}),
    Product.create({ name: 'Chamomile Tea', price: 5.00, quantity: 50, imageUrl: 'https://i.ebayimg.com/images/g/4asAAOSwBOtY9LtK/s-l300.jpg', 
      description: `Chamomile tea is an herbal tea made from the flowers and buds of the chamomile plant from the daisy family Asteraceae. Chamomile tea is naturally caffeine-free, gluten-free, and a popular bedtime tea. It is known for its soothing and calming properties. The tea is brewed by infusing pure chamomile flowers in hot water. hamomile tea offers herbal and fruity notes with a refreshing, smooth finish. The taste of chamomile tea is often described as similar to a crisp apple. In fact, chamomile derives its name from the Greek words “chamaimelon,” which literally translate to 'ground apple' or 'earth apple'. Chamomile tea boats a light, airy taste with a sweet aromatic scent. The tea is light yellow in color, mimicking the look of gentle sunlight. The tea also boasts a range of health benefits that make it as good for you as it is tasty.
      <br/>
      Preparation: To brew fresh chamomile tea, simply place the flowers in hot water and steep for three to five minutes. Use a tea strainer to remove the flowers before drinking.
      Certified organic loose leaf teas tend to have better flavor and health benefits when compared to tea bags. That's usually because tea bags only contain broken pieces and dust of the healthy plants.
      Loose tea on the other hand contains the whole flowers, ensuring you get all the flavor and benefits from each brew. If you absolutely have to use a chamomile tea bag, opt for one that is large enough to let the flowers expand completely to infuse flavor.`, quantity: 50 }),
    Product.create({ name: 'Chrysanthemum Tea', price: 6.00, quantity: 50, imageUrl: 'https://i.etsystatic.com/9720409/r/il/a1d102/1957718800/il_1588xN.1957718800_fm02.jpg', 
      description: `Chrysanthemums are flowering plants native to East Asia. These edible flowers are often used as a garden decoration and natural pest control, but they also have culinary applications. Yellow or white chrysanthemum flowers can be boiled to make an herbal tea with a range of health benefits.`, 
      preparation: `You can also make your own chrysanthemum tea at home. To prepare chrysanthemum tea at home, boil 0.2 ounces of dried chrysanthemum flowers in 3 cups of water. Let the tea steep for three to five minutes and enjoy plain or with light sweeteners like a bit of sugar or honey, to taste.`}),
    Product.create({ name: 'Rose Tea', price: 6.00, quantity: 50, imageUrl: 'https://cdn.shopify.com/s/files/1/1093/4358/products/image_c6062786-2c18-41d5-8016-c3fbf936dc67_2000x.jpg?v=1611689073', 
      description: `Rose tea is an herbal tea that can be made from a variety of different parts of the rose plant including rose petals, rose buds, and rosehips. The tea is also often blended with true tea leaves such as green tea and black tea to make floral flavored teas. Rose tea blends are also combined with other herbal teas such as chamomile tea, hibiscus tea, and rooibos. Rose tea is a caffeine-free herbal tea that is a best seller thanks to its sweet, floral flavor. The tea contains vitamins and minerals as well as antioxidants that are beneficial for well-being. Try this herbal tea today and discover the different flavors or rose petal tea, rose hips tea, and rose bud tea.
      <br/>
      Preparation: Rose tea can be brewed using tea bags, loose tea, or fresh petals from your garden. Bring filtered or spring water to a rolling boil in a large teapot or electric kettle. Add in one teaspoon of rose petals or rose hips for every eight ounces of water. Steep the rose tea in the boiling water using an infuser for 5 to 7 minutes. If you are making an herbal tea blend with black tea or another strong true tea, limit the steeping time to 3 to 5 minutes. Remove the strainer from the hot water and pour the rose water tea into a teacup. Add sweetener if desired and enjoy.`})
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
