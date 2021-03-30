const data = require('../shared/catalog-data');

module.exports = async function (context, message) {
  try {
    // Build the pre-order JSON from the request
    const order = {
      id: context.bindings.orderQueueItem.Id,
      user: context.bindings.orderQueueItem.User,
      date: context.bindings.orderQueueItem.Date,
      icecream: await data.getIcecream(context.bindings.orderQueueItem.IcecreamId),
      status: context.bindings.orderQueueItem.Status,
      driver: {
        driverId: null,
        name: null,
        imageUrl: null
      },
      fullAddress: req.body.ShippingAddress,
      deliveryPosition: null,
      lastPosition: null
    };

    // Add the pre-order JSON document in a queue
    console.log('Storing order');
    context.bindings.orderDocument = JSON.stringify(order);
    context.done();
  } catch (error) {
    console.error(error);
  }
};
