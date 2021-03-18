const { getUser } = require('../shared/user-utils');
const sql = require('mssql');
const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);
  if (!user) {
    context.res.status(401);
    return;
  }

  try {
    const pool = await sql.connect(process.env['SQL_CONNECTION_STRING']);
    let result = await pool.request()
      .input('User', sql.VarChar, user.userDetails)
      .input('IceCreamId', sql.Int, req.body.productId)
      .input('FullAddress', sql.VarChar, '1 Microsoft Way, Redmond, WA 98052, USA')
      .query('insert into dbo.Orders ([User], [IceCreamId], [FullAddress]) VALUES (@User, @IceCreamId, @FullAddress)');
      
      const serviceKey = process.env['PERSONALIZER_APIKEY'];
      const baseUri = process.env['PERSONALIZER_ENDPOINT'];
      const credentials = new CognitiveServicesCredentials(serviceKey);
      const personalizerClient = new Personalizer.PersonalizerClient(credentials, baseUri);

      await personalizerClient.events.reward(req.body.personalizerEventId, { value: req.body.featured ? 1 : 0 });    

    context.res.status(201);
  } catch (error) {
    context.res.status(500).send(error);
  }
  // context.bindings.preOrder = {
  //   Id: uuidv4(),
  //   User: user.userDetails,
  //   Date: Date.now,
  //   IcecreamId: req.body.productId,
  //   Status: 'New',
  //   DriverId: null,
  //   FullAddress: ,
  //   LastPosition: null
  // };
};
