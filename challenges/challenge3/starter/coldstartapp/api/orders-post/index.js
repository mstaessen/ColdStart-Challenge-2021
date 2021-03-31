const { getUser } = require('../shared/user-utils');
const orderData = require('../shared/order-data');
const catalogData = require('../shared/catalog-data');
const recoData = require('../shared/recommendation-data');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  try {
    // Set reward score to 1 if the recommended product was ordered
    if (req.body.EventId) {
      await recoData.setReward(req.body.EventId, 1);
    }

    const icecream = await catalogData.getIcecream(req.body.Id);

    // Insert the pre-order in the database
    console.log("Inserting order in database");
    await orderData.insertOrder(user.userDetails, icecream.Id, req.body.ShippingAddress);

    // Retrieve the full order from the database (with primary key filled)
    console.log("Retrieving order from database");
    const order = await orderData.getLastOrder(user.userDetails);

    const orderQueueItem = new {
      id: order.Id,
      user: order.User,
      date: order.Date,
      icecream: icecream,
      status: order.Status,
      driver: {
        driverId: null,
        name: null,
        imageUrl: null
      },
      fullAddress: order.FullAddress,
      deliveryPosition: null,
      lastPosition: null
    };

    // Add the pre-order JSON document in a queue
    console.log('Queueing order');
    context.bindings.myQueueItem = JSON.stringify(orderQueueItem);

    context.res.status(201).json(items[0]);
    context.done();
  } catch (error) {
    console.error(error);
    context.res.status(500).send(error);
  }
};
