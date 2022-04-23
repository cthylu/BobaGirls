'use strict'

const {db, models: {User, Tea, Order, LineItem } } = require('../server/db')

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
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded users successfully`)

  //Creating Teas
  const teas = await Promise.all([
    Tea.create({ teaname: 'Green Tea', price: 7 }),
    Tea.create({ teaname: 'Jasmine Tea', price: 5 }),
    Tea.create({ teaname: 'Oolong Tea', price: 6 })
  ])

  console.log(`seeded ${teas.length} teas`)
  console.log(`seeded teas successfully`)

  // Creating Orders
  const orders = await Promise.all([
    Order.create({ totalCost: 2, userId: '1', isCart: true }),
    Order.create({ totalCost: 5, userId: '2', isCart: false })
  ])

  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded orders successfully`)

  // Creating LineItems
  const lineitems = await Promise.all([
    LineItem.create({ quantity: 1, cost: 3, teaId: '1', orderId: '1' }),
    LineItem.create({ quantity: 3, cost: 6, teaId: '3', orderId: '2' }),
    LineItem.create({ quantity: 2, cost: 3, teaId: '1', orderId: '1' })
  ])


  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    teas,
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
