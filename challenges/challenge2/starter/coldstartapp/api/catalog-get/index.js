// const data = require('../shared/catalog-data');
const sql = require('mssql');
const uuid = require('uuid').v4;
const Personalizer = require('@azure/cognitiveservices-personalizer');
const CognitiveServicesCredentials = require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;

module.exports = async function (context, req) {
  // try {
    // Get catalog from file
    // const items = await data.getCatalog();
    
    // Get catalog from sql
    await sql.connect(process.env['SQL_CONNECTION_STRING']);
    const result = await sql.query`select Id, Name, Description, ImageUrl from dbo.Icecreams`;
    const items = result.recordset.map(r => ({
        Id: r.Id,
        Name: r.Name,
        Description: r.Description,
        ImageUrl: r.ImageUrl,
      }));

    const apiKey = process.env['PERSONALIZER_APIKEY'];
    const endpoint = process.env['PERSONALIZER_ENDPOINT'];

    const credentials = new CognitiveServicesCredentials(apiKey);
    const personalizerClient = new Personalizer.PersonalizerClient(credentials, endpoint);

    let rankRequest = {}
    rankRequest.eventId = uuid();
    const now = new Date();
    rankRequest.contextFeatures = [ 
      { dayOfWeek: now.getDay() },
      { timeOfDay: now.getHours() }
    ];
    rankRequest.actions = items.map(i => ({
      id: `${i.Id}`,
      features: [
        { name: i.Name },
        { description: i.Description },
      ]
    }));
    rankRequest.excludedActions = [];
    rankRequest.deferActivation = false;
    const rankResponse = await personalizerClient.rank(rankRequest);

    context.res.status(200).send({
      icecreams: items,
      featuredIcecreamId: parseInt(rankResponse.rewardActionId),
      personalizerEventId: rankResponse.eventId
    });
  // } catch (error) {
    // context.res.status(500).send(error);
  // }
};
