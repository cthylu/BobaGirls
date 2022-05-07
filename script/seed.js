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
    User.create({ 
      profilePicture: 'https://media-be.chewy.com/wp-content/uploads/2021/06/02102132/Pomeranian_Featured-Image-1024x615.jpg',
      username: 'cody',  
      password: '123', 
      isAdmin: true, 
      firstName: 'cody', 
      lastName: 'moldy',
      email: 'moldycody@outlook.com',
      creditCard: 939393939393,
      address: '92 Molding Lane',
      city: 'Cheese Touch',
      state: 'NY',
      zipCode: 11221,
    }),
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
    //Teas:
    Product.create({ name: 'Green Tea', price: 7.00, quantity: 50, key: 'tea', imageUrl: 'https://i.imgur.com/nDYzIbw.png', 
      description: `In the West, green tea is nowhere near as popular as black tea. Green tea is the most popular type of tea in Japan and in parts of China, and it is gaining popularity in the West. Depending on where they were grown, how they were processed, when they were harvested, etc., good green teas can have a range of tastes. Common descriptors for good quality green tea include: sweet, bittersweet, nutty, vegetal, buttery, floral, swampy, fruity, and oceanic. Steamed green teas tend to taste bittersweet (especially in the aftertaste), while other green teas tend to taste sweet.
      <br/> 
      Preparation: Many people who think they don't like green tea have simply never tried good green tea that has been prepared correctly. A common mistake in brewing green tea is using boiling water. While it's generally okay to use boiling water to make black tea, using boiling water for green tea can turn even the best leaves into a bitter, nasty mess. Most green teas are best when steeped at around 150 to 180 F, which is only simmering. It's also important to avoid steeping your green tea too long, as over-steeping will also make your green tea undrinkably bitter. Some teas (especially steamed Japanese green teas) should only be steeped for 20 or 30 seconds.`}),
    Product.create({ name: 'Jasmine Tea', price: 5.50, quantity: 50, key: 'tea', imageUrl: 'https://i.imgur.com/yyeCIty.png', 
      description: `Jasmine tea generally refers to a tea that has been scented with jasmine flowers or flavorings. It is usually made with green tea and is not an herbal tea. Generally speaking, jasmine tea is only as healthy as the tea used to make it was before it was flavored. However, there is some added benefit in terms of the jasmine's relaxing scent, which researchers found was akin to the lavender's relaxing scent in terms of lowering heart rate. Additionally, jasmine flavoring may entice people to drink it more often than unflavored tea, and a tea you drink is much healthier for you than a tea that sits in your cupboard. Some people also claim that jasmine acts as an aphrodisiac... and just when you thought tea was tame! Please note that there is some danger associated with drinking large quantities of jasmine tea during pregnancy and that jasmine tea is best drunk in moderation. Also, while jasmine tea (like many other tea types) is claimed to increase metabolism, it is best to avoid drinking it on an empty stomach, as it is somewhat acidic and can cause stomach discomfort.
      <br/> 
      Preparation: Jasmine tea is usually best steeped with filtered water that is around 190 F (simmering, not boiling)—three minutes is usually plenty. About one teaspoon per cup of loose-leaf jasmine tea is good, but you can use less tea or more water if you are brewing jasmine pearls (which only take a few pearls per cup) or jasmine flowering tea (one "flower" is enough for a large mug or whole pot of tea).`}),
    Product.create({ name: 'Oolong Tea', price: 6.00, quantity: 50, key: 'tea', imageUrl: 'https://i.imgur.com/2PnHHmD.png', 
      description: `Oolong tea, or wulong tea, is one of the five true tea types—along with white tea, green tea, black tea, and pu-erh tea— made from the leaves of the Camellia sinensis plant. The tea is classified as a Chinese tea and is one of the main tea exports from China. The term wulong in Chinese literally translates to "black dragon tea".  Oolong tea has long been used in traditional Chinese medicine as an herbal remedy for everything from stomach ailments to heart disease.
      <br/>
      Preparation: There are two methods to brew oolong tea: the traditional Chinese way and the western way. You can also brew oolong tea using oolong tea bags, but most tea experts believe the flavor of bagged teas to be inferior to loose leaf varieties. Whichever method you choose, follow these general guidelines when brewing oolong tea.
      First, bring water to 200-212 degrees Fahrenheit depending on your oolong variety. Lightly oxidized oolongs should brew at lower temperatures than heavily oxidized varieties.
      Then, use 2 tablespoons of loose leaf tea for every six ounces of water or one tea pearl if your oolong is sold in ball form.`}),
    Product.create({ name: 'Lavender Tea', price: 7.00, quantity: 50, key: 'tea', imageUrl: 'https://i.imgur.com/9YPgsbC.png', 
      description: `Lavender tea offers a delicate flavor and aromatic fragrance that boasts extensive health benefits. Unearth the beauty of this floral plant and find out how drinking a cup of lavender can boost your health. Lavender tea boasts a distinctive flavor and aromatic fragrance. Lavender tea features hints of rosemary and mint. Some blends offer a smoky or woody flavor while others tend to be more floral and sweet. Lavender tea can also have hints of green apple, rose, and earthy notes similar to those found in green tea.
      <br/>
      Preparation: Lavender tea can be made using tea bags or loose flowers. The flower buds can be fresh from your garden or dried for added shelf life.
      We always recommend using loose tea blends rather than tea bags. Loose teas offer fresher flavor and tend to contain better quality flowers and buds than tea bag varieties. Pour 1 cup (250 mL) of water over 1/2 teaspoon of loose lavender buds, and let it steep for a few minutes.`}),
    Product.create({ name: 'Chamomile Tea', price: 5.00, quantity: 50, key: 'tea', imageUrl: 'https://i.imgur.com/uKiiqAv.png', 
      description: `Chamomile tea is an herbal tea made from the flowers and buds of the chamomile plant from the daisy family Asteraceae. Chamomile tea is naturally caffeine-free, gluten-free, and a popular bedtime tea. It is known for its soothing and calming properties. The tea is brewed by infusing pure chamomile flowers in hot water. hamomile tea offers herbal and fruity notes with a refreshing, smooth finish. The taste of chamomile tea is often described as similar to a crisp apple. In fact, chamomile derives its name from the Greek words “chamaimelon,” which literally translate to 'ground apple' or 'earth apple'. Chamomile tea boats a light, airy taste with a sweet aromatic scent. The tea is light yellow in color, mimicking the look of gentle sunlight. The tea also boasts a range of health benefits that make it as good for you as it is tasty.
      <br/>
      Preparation: To brew fresh chamomile tea, simply place the flowers in hot water and steep for three to five minutes. Use a tea strainer to remove the flowers before drinking.
      Certified organic loose leaf teas tend to have better flavor and health benefits when compared to tea bags. That's usually because tea bags only contain broken pieces and dust of the healthy plants.
      Loose tea on the other hand contains the whole flowers, ensuring you get all the flavor and benefits from each brew. If you absolutely have to use a chamomile tea bag, opt for one that is large enough to let the flowers expand completely to infuse flavor.`, quantity: 50 }),
    Product.create({ name: 'Chrysanthemum Tea', price: 6.00, quantity: 50, key: 'tea', imageUrl: 'https://i.imgur.com/rXJuJ26.png', 
      description: `Chrysanthemums are flowering plants native to East Asia. These edible flowers are often used as a garden decoration and natural pest control, but they also have culinary applications. Yellow or white chrysanthemum flowers can be boiled to make an herbal tea with a range of health benefits.`, 
      preparation: `You can also make your own chrysanthemum tea at home. To prepare chrysanthemum tea at home, boil 0.2 ounces of dried chrysanthemum flowers in 3 cups of water. Let the tea steep for three to five minutes and enjoy plain or with light sweeteners like a bit of sugar or honey, to taste.`}),
    Product.create({ name: 'Rose Tea', price: 6.00, quantity: 50, key: 'tea', imageUrl: 'https://i.imgur.com/k1KaFqC.png', 
      description: `Rose tea is an herbal tea that can be made from a variety of different parts of the rose plant including rose petals, rose buds, and rosehips. The tea is also often blended with true tea leaves such as green tea and black tea to make floral flavored teas. Rose tea blends are also combined with other herbal teas such as chamomile tea, hibiscus tea, and rooibos. Rose tea is a caffeine-free herbal tea that is a best seller thanks to its sweet, floral flavor. The tea contains vitamins and minerals as well as antioxidants that are beneficial for well-being. Try this herbal tea today and discover the different flavors or rose petal tea, rose hips tea, and rose bud tea.
      <br/>
      Preparation: Rose tea can be brewed using tea bags, loose tea, or fresh petals from your garden. Bring filtered or spring water to a rolling boil in a large teapot or electric kettle. Add in one teaspoon of rose petals or rose hips for every eight ounces of water. Steep the rose tea in the boiling water using an infuser for 5 to 7 minutes. If you are making an herbal tea blend with black tea or another strong true tea, limit the steeping time to 3 to 5 minutes. Remove the strainer from the hot water and pour the rose water tea into a teacup. Add sweetener if desired and enjoy.`}),

    //Toppings:

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
    
    Product.create({ 
    name: 'Mini Mochi' , 
    price: 4.00, 
    quantity: 200 , 
    key: 'topping', 
    imageUrl: 'https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/5728_Mochi+Rice+Cake-ntd7h-Sk-large.jpg',
    description: 'Mini Mochi is one of the most popular flavors you can think of to top off your favorite dessert. Imagine a spoonful of matcha green tea snow ice or frozen yogurt, sided with these little rice cake balls, and a bit of red bean. Delicious!'}),
    Product.create({ 
    name: 'Red Bean', 
    price: 4.00, 
    quantity: 200, 
    key: 'topping', 
    imageUrl: 'https://www.babyment.com/food/red-bean.jpg',
    description: 'Red bean soaked and mixed with sugar is a popular topping in bubble tea.  It is not only delicious but healthy and provides nutrients and health benefits. Red bean is rich in potassium which can help to regulate blood pressure and is therefore beneficial to the heart. Red bean is also rich in antioxidants which can protect organs from attack by free radicals.  Red bean contains vitamins A, B6 and minerals like magnesium and iron. '}),
    Product.create({ 
    name: 'Black Jelly' , 
    price: 4.00, 
    quantity: 200 , 
    key: 'topping', 
    imageUrl: 'https://chatime.com/wp-content/uploads/2019/04/toppings-grass-jelly.png',
    description: 'Grass jelly, also known as leaf jelly or herb jelly, is a jelly-like dessert eaten in East and Southeast Asia. It is created by using the Platostoma palustre plant (a member of the mint family) and has a mild, slightly bitter taste. It is served chilled, with other toppings such as fruit, or in bubble tea or other drinks. It has a soft silky texture, easy to mix and delicious to eat.  Mix it with some sugar if you like things extra sweetened!'}),
    Product.create({ 
    name: 'Aloe Vera' , 
    price: 4.00, 
    quantity: 200 , 
    key: 'topping', 
    imageUrl: 'https://www.bubbletea.com.au/site/images/source/aloe_vera_1.jpg',
    description: 'A delicious and fun to chewy topping for those who love jelly! Aloe Vera small chunks syrup. Suitable for desserts. An easy and fun addition to your drink. Simply scoop and serve in your delicious boba and enjoy.  Refrigerate After Opening, Use within 1 week. Vegeterian.'}),

      // merch
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
    Product.create({
      name:'Boba Mini Backpack',
      price: 40.00,
      quantity: 200,
      key: 'merchandise',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0101/6617/3732/products/boba-mini-backpack-bubble-tea-boba-tea-14709426618404_800x.jpg?v=1600345348',
      description: 'Calling Boba tea (Bubble tea) lovers from around the world, this cute Mini Backpack will be your new best companion for travelling or for everyday life. It\’s compact yet spacious, perfect for fitting all your essentials whilst going about your everyday life.Don’t let the cuteness fool you, it’s as cute as it is functional. Designed to be configured three different ways—as a backpack, crossbody or a shoulder bag—this Boba Mini Backpack will have you ready for anything. Specifications: 1 main compartment, 1 interior pocket, 1 back zipper pocket, 2 small side pockets. Materials: Premium Faux leather. Dimensions: 19.5 x 11.5 x 24 cm (7.6 x 4.5 x 9.4 in)',
    }),
    Product.create({
      name:'Boba is Life Tote',
      price: 25.00,
      quantity: 200,
      key: 'merchandise',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0101/6617/3732/products/boba-is-life-tote-bag-bubble-tea-boba-tea-14729087746084_800x.jpg?v=1594046122',
      description: 'Introducing our limited edition Boba is Life Tote bag, designed to be the cutest representation of how much Love & Happiness Boba tea brings into our lives and everyone around us. The Boba is Life Tote bag is the cutest way to showcase your love for Boba and is the perfect company for your everyday life. Specifications: Bag dimensions: 38.1cm x 38.1cm (15 x 15 in). Handle dimensions: Handle Length 30 cm (11.8 in), width 2.5cm (1 in). 100% Polyester',
    }),
    Product.create({
      name:'Boba Milk Tea AirPods Case',
      price: 20.00,
      quantity: 200,
      key: 'merchandise',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0101/6617/3732/products/boba-milk-tea-airpods-case-bubble-tea-boba-tea-14728192458788_x686@2x.jpg?v=1592523275',
      description: 'If you\’re living life on the edge and leaving your AirPods naked and without a case, you’re almost guaranteed to damage it or even worse, lose it. Don\’t worry, we\’ve got your back on this and designed this cute little Boba Milk Tea AirPods case to help keep your precious AirPods safe and sound in its loving embrace. We\’ve made each of our Boba Milk tea AirPods case promise to keep your AirPods safe no matter how much wear and tear they experience with your everyday life.',
    }),
    Product.create({
      name:'Boba Tea AirTag Keyring Case',
      price: 10.00,
      quantity: 200,
      key: 'merchandise',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0101/6617/3732/products/ProductImage2.jpg?v=1623127033',
      description: 'This cute Boba tea AirTag Keyring Case is the perfect sidekick to your new AirTag. It will stay firmly attached to your bag, backpack or your keys while following you on all of your daily adventures and travel. It\’s adorable yet thoughtful design features raised edges that helps keep your Airtag safely inside without being scratched or damaged. The open design keeps the elegant AirTag design and your personalized engravings exposed.',
    }),
    
      // Syrup info: https://www.bossenstore.com/collections/bubble-tea-concentrated-syrup
    Product.create({ name: 'Black Sugar Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle_blacksugar_DS0242_b72985dd-9fac-44b9-9f44-2d154db4297f_large.jpg?v=1620691665', 
      description: `One of the most popular sweeteners used in bubble tea, our Bossen Black Sugar syrup (aka Brown Sugar) is a dark, thick, crystalline form of sugar that has a delicious caramel flavor and aroma. Best for making classic milk teas, also wonderfully enhances smoothies, fruit juices, yogurt, and shaved ice desserts. Historically, more than just a distinctive sweetener, Black Sugar is also used by traditional Chinese medical practitioners who recommend it to provide an energy boost and enhance blood circulation, among other things.
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Dragon Fruit Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle_dragon_fruit_large.jpg?v=1615917379', 
      description: `Dragon fruit is native to Central American and is now consumed all around the world. It is also known as "Pitaya" and comes in various forms and colors. Boba Girls' Fruit syrup has a beautiful signature magenta color and it will add a refreshing taste to any summertime tea. 
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Lychee Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle__DSF0501_lychee_large.jpg?v=1594080304', 
      description: `
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Peach Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle_peach_cb224eb7-ad18-4d50-a4d8-07bbe823173e_large.jpg?v=1590710606', 
      description: `Peach syrup is a classic flavor, adding great taste to any drink of your choice. Best paired with black tea.
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Honeydew Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle__DSF0701_honeydew_large.jpg?v=1591818510', 
      description: `Honeydew syrup accentuates the real honeydew fruit flavor and is rich in melony sweetness. Use it to make a perfect summer pick-me-up refresher. A melon bubble iced tea, boba smoothie, or ice-blended fruit juice will alight on the tongue like sunshine.
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Strawberry Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle__DSF0111_strawberry_somepulp_large.jpg?v=1590694756', 
      description: `Everyone loves strawberries!  Its combination of sweet and tart is divine and addictive. Boba Girls' syrup is extracted from natural strawberries with little seeds and pieces of pulp inside, the syrup has a robust fruity aroma and authentic taste for juicy strawberry.
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Mango Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle__DSF0201_mango_large.jpg?v=1594171537', 
      description: `Whatever season it is, in our heart we long for that summer beach vacation sometimes. Let our mango syrup recreate tropical refreshers for you. 
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Passion Fruit Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle__DSF1301_passion_fruit_large.jpg?v=1594338387', 
      description: `Boba Girls' passion fruit syrup is rich in flavor and contains an authentic passion fruit aroma. Infuse it with your favorite drinks like iced tea, slush, smoothie, or top it on frosty desserts like ice cream, shaved ice, and frozen yogurt.
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Grapefruit Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle__DSF1501_grapefruit_grande.jpg?v=1594231934', 
      description: `Boba Girls' grapefruit syrup is a classic. It is balanced perfectly with a nice mix of sweet and bitterness flavors. Paired best with cold drinks, served with black tea.
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Wintermelon Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle_wintermelon_large.jpg?v=1594250318', 
      description: `Wintermelon is a large fruit that belongs to the honeydew family. It adds a nice sweetness into your drink! Good either in a cold or hot drink, served with black or green tea.
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
    * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Green Apple Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle__DSF0601_green_apple_grande.jpg?v=15942550487', 
      description: `Green apple is classic twist on your drink. Delicious, tart, and sweet flavors to add into your tea! Best when cold mixed with green tea.
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    Product.create({ name: 'Kiwi Syrup', price: 5.50, quantity: 50, key: 'syrup', imageUrl: 'https://cdn.shopify.com/s/files/1/0189/8074/products/syrup_bottle_kiwi_e3546c69-a3ca-4834-819d-a2a795e9e046_grande.jpg?v=1608771953', 
      description: `Boba Girls' pride ourselves in providing traditional flavors as well as hard-to-find tropical flavors. We recommend adding 8 oz. of kiwi syrup to every one gallon of plain frozen yogurt.
      <br/>
      * Recommended Serving: 8 oz. syrup to every one gallon of plain frozen yogurt.
      * Net Weight: 750 mL (25.4 fl oz) per bottle.` }),
    // Product.create({ name: '', price: 6.00, quantity: 50, imageUrl: '', 
    //   description: `` }),
    
    //milk powders
      Product.create({ 
      name: 'Whole Milk Powder' ,
      price: 6.00, 
      quantity: 200 , 
      key: 'milk',
      imageUrl: 'https://m.media-amazon.com/images/I/81M7DvAD7eL._SL1500_.jpg', 
      description: 'Whole milk in its most unadulterated form — and in addition to the fat found in milk, the main component (about 87 percent) is water. You\'ll also find vitamins, minerals, sugars like lactose and proteins like caseins and whey proteins. Perfect for the daily dairy lovers who want it as it\'s made' }),
      Product.create({ 
      name: 'Skim Milk 2% Powder' , 
      price: 6.00, 
      quantity: 200 , 
      key: 'milk',
      imageUrl: 'https://m.media-amazon.com/images/I/61ISN+q8VIS._SY445_.jpg', 
      description: 'Skim Milk is made when all the milkfat is removed from whole milk. It tends to contain around very little fat. Perfect for when you want less milk fat in your boba, but still want the nutrients and consistency from real dairy.'}),
      Product.create({ 
      name: 'Almond Milk Powder' , 
      price: 8.00, 
      quantity: 200 , 
      key: 'milk', 
      imageUrl: 'http://www.nutricentreng.com/wp-content/uploads/2016/05/Almond-Milk-Powder.jpg',
      description: 'Almond milk is a plant milk with a creamy texture and nutty flavor manufactured from almonds, although some types or brands are flavored in imitation of cow\'s milk. It does not contain cholesterol or lactose and is low in saturated fat. Perfect for those who cannot have genuine dairy products.'}),
      Product.create({ 
      name: 'Oat Milk Powder' , 
      price: 9.00, 
      quantity: 200 , 
      key: 'milk',
      imageUrl: 'https://cdn.shopify.com/s/files/1/0493/0558/3773/products/OatMilkPowderBagFront.jpg?v=1622850159', 
      description: 'Oat milk is a plant milk derived from whole oat grains by extracting the plant material with water. Oat milk has a creamy texture and mild oatmeal-like flavor, and is manufactured in various flavors, such as sweetened, unsweetened, vanilla, and chocolate. Flavors can also be made at home such as chocolate, with cocoa powder, it makes the perfect chocolate oat milk.  Perfect for those with dairy and almond allegies'}),
      Product.create({ 
      name: 'Soy Milk Powder' , 
      price: 9.00, 
      quantity: 200 , 
      key: 'milk', 
      imageUrl: 'https://i5.walmartimages.com/asr/a05fee3f-4211-475f-8319-7f71a2cc522f_1.197f902fc8a7883551b5d430265a0978.jpeg',
      description: 'Soymilk, is a plant-based drink produced by soaking and grinding soybeans, boiling the mixture, and filtering out remaining particulates. It is a stable emulsion of oil, water, and protein. Its original form is an intermediate product of the manufacture of tofu. Perfect for those with dairy and almond allergies that enjoy tofu and something with nutrients. '}),
  ])


  console.log(`seeded ${products.length} products`)
  console.log(`seeded products successfully`)

  // Creating Orders
  const orders = await Promise.all([
    // cody
    Order.create({ totalCost: 2, userId: users[0].id, isCart: true }),
    Order.create({ totalCost: 6, userId: users[0].id, isCart: false }),
    
    //murphy
    Order.create({ totalCost: 5, userId: users[1].id, isCart: false }),
    Order.create({ totalCost: 3, userId: users[1].id, isCart: true }),
    Order.create({ totalCost: 5, userId: users[1].id, isCart: false }),
    Order.create({ totalCost: 5, userId: users[1].id, isCart: false }),
    Order.create({ totalCost: 5, userId: users[1].id, isCart: false }),

    //ice
    Order.create({ totalCost: 5, userId: users[2].id, isCart: false }),
    Order.create({ totalCost: 5, userId: users[2].id, isCart: false }),

    //yingying
    Order.create({ totalCost: 5, userId: users[3].id, isCart: false }),
    Order.create({ totalCost: 5, userId: users[3].id, isCart: false }),

    //cathy
    Order.create({ totalCost: 5, userId: users[4].id, isCart: false }),
    Order.create({ totalCost: 5, userId: users[4].id, isCart: false }),
    
    //kim
    Order.create({ totalCost: 5, userId: users[5].id, isCart: false }),
    Order.create({ totalCost: 5, userId: users[5].id, isCart: false }),
  ])

  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded orders successfully`)
  /*
    Products:
      0 - Green Tea                     13 - black sugar
      1 - Jasmine Tea                   14 - dragon fruit
      2 - Oolong Tea                    15 - lychee
      3 - Lavender Tea                  16 - peach
      4 - Chamomile Tea                 17 - honeydew
      5 - Chrysanthemum Tea             18 - strawberry
      6 - Rose Tea                      19 - mango
      7 - Tapioca Pearls                20 - passionfruit
      8 - Strawberry Popping Boba       21 - grapefruit
      9 - Lychee Jelly                  22 - wintermleon
      10 - Metal Straws                 23 - green apple
      11 - Reusable Tumblr              24 - kiwi
      12 - Mason Jar                    25 
  */

  // Creating LineItems
  const lineitems = await Promise.all([
    // cody
    LineItem.create({ quantity: 1, cost: 3, productId: products[0].id, orderId: orders[0].id }), // This should show up in cart
    LineItem.create({ quantity: 2, cost: 3, productId: products[1].id, orderId: orders[0].id }), 
    LineItem.create({ quantity: 2, cost: 3, productId: products[2].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[3].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[13].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[15].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[16].id, orderId: orders[0].id }),
    LineItem.create({ quantity: 2, cost: 3, productId: products[17].id, orderId: orders[0].id }),

    LineItem.create({ quantity: 1, cost: 3, productId: products[2].id, orderId: orders[1].id }), // This should not show up in cart
    LineItem.create({ quantity: 1, cost: 3, productId: products[3].id, orderId: orders[1].id }),

    // murphy
    LineItem.create({ quantity: 1, cost: 6, productId: products[2].id, orderId: orders[2].id }), // This should not show up in cart
    LineItem.create({ quantity: 1, cost: 6, productId: products[3].id, orderId: orders[2].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[4].id, orderId: orders[2].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[7].id, orderId: orders[2].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[9].id, orderId: orders[2].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[10].id, orderId: orders[2].id }),

    LineItem.create({ quantity: 1, cost: 3, productId: products[0].id, orderId: orders[3].id }), // This should show up in cart
    LineItem.create({ quantity: 3, cost: 3, productId: products[2].id, orderId: orders[3].id }),
    LineItem.create({ quantity: 4, cost: 3, productId: products[4].id, orderId: orders[3].id }),

    LineItem.create({ quantity: 1, cost: 6, productId: products[1].id, orderId: orders[4].id }), // This should not show up in cart
    LineItem.create({ quantity: 2, cost: 6, productId: products[12].id, orderId: orders[4].id }),

    LineItem.create({ quantity: 2, cost: 6, productId: products[1].id, orderId: orders[5].id }), // This should not show up in cart
    LineItem.create({ quantity: 2, cost: 6, productId: products[17].id, orderId: orders[5].id }),
    LineItem.create({ quantity: 2, cost: 6, productId: products[6].id, orderId: orders[5].id }),
    LineItem.create({ quantity: 2, cost: 6, productId: products[8].id, orderId: orders[5].id }),

    LineItem.create({ quantity: 10, cost: 6, productId: products[11].id, orderId: orders[6].id }), // This should not show up in cart
    LineItem.create({ quantity: 10, cost: 6, productId: products[12].id, orderId: orders[6].id }),

    //ice
    LineItem.create({ quantity: 1, cost: 6, productId: products[0].id, orderId: orders[7].id }), // This should not show up in cart
    LineItem.create({ quantity: 1, cost: 6, productId: products[2].id, orderId: orders[7].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[7].id, orderId: orders[7].id }),

    LineItem.create({ quantity: 4, cost: 6, productId: products[10].id, orderId: orders[8].id }), // This should not show up in cart
    LineItem.create({ quantity: 4, cost: 6, productId: products[11].id, orderId: orders[8].id }),
    LineItem.create({ quantity: 2, cost: 6, productId: products[16].id, orderId: orders[8].id }),
    LineItem.create({ quantity: 2, cost: 6, productId: products[17].id, orderId: orders[8].id }),
    LineItem.create({ quantity: 2, cost: 6, productId: products[18].id, orderId: orders[8].id }),
    LineItem.create({ quantity: 2, cost: 6, productId: products[19].id, orderId: orders[8].id }),

    //yingying
    LineItem.create({ quantity: 1, cost: 6, productId: products[0].id, orderId: orders[9].id }), // This should not show up in cart
    LineItem.create({ quantity: 1, cost: 6, productId: products[7].id, orderId: orders[9].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[17].id, orderId: orders[9].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[9].id, orderId: orders[9].id }),

    LineItem.create({ quantity: 1, cost: 6, productId: products[1].id, orderId: orders[10].id }), // This should not show up in cart
    LineItem.create({ quantity: 5, cost: 6, productId: products[0].id, orderId: orders[10].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[2].id, orderId: orders[10].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[13].id, orderId: orders[10].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[14].id, orderId: orders[10].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[15].id, orderId: orders[10].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[16].id, orderId: orders[10].id }),

    //cathy
    LineItem.create({ quantity: 1, cost: 6, productId: products[5].id, orderId: orders[11].id }), // This should not show up in cart
    LineItem.create({ quantity: 5, cost: 6, productId: products[6].id, orderId: orders[11].id }),
    LineItem.create({ quantity: 2, cost: 6, productId: products[7].id, orderId: orders[11].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[8].id, orderId: orders[11].id }),
    LineItem.create({ quantity: 3, cost: 6, productId: products[2].id, orderId: orders[11].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[21].id, orderId: orders[11].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[13].id, orderId: orders[11].id }),

    LineItem.create({ quantity: 1, cost: 6, productId: products[10].id, orderId: orders[12].id }), // This should not show up in cart
    
    //kim
    LineItem.create({ quantity: 10, cost: 6, productId: products[6].id, orderId: orders[13].id }), // This should not show up in cart
    LineItem.create({ quantity: 13, cost: 6, productId: products[2].id, orderId: orders[13].id }),
    LineItem.create({ quantity: 13, cost: 6, productId: products[5].id, orderId: orders[13].id }),
    LineItem.create({ quantity: 16, cost: 6, productId: products[1].id, orderId: orders[13].id }),
    LineItem.create({ quantity: 18, cost: 6, productId: products[6].id, orderId: orders[13].id }),

    LineItem.create({ quantity: 25, cost: 6, productId: products[7].id, orderId: orders[14].id }),// This should not show up in cart
    LineItem.create({ quantity: 13, cost: 6, productId: products[8].id, orderId: orders[14].id }),
    LineItem.create({ quantity: 27, cost: 6, productId: products[9].id, orderId: orders[14].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[21].id, orderId: orders[14].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[22].id, orderId: orders[14].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[23].id, orderId: orders[14].id }),
    LineItem.create({ quantity: 1, cost: 6, productId: products[24].id, orderId: orders[14].id }),
  ])

  console.log(`seeded ${lineitems.length} lineitems`)
  console.log(`seeded lineitems successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1],
      ice: users[2],
      yingying: users[3],
      cathy: users[4],
      kim: users[5]
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
