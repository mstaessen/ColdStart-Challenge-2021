using System;
using System.Linq;
using System.Threading.Tasks;
using AzureMapsToolkit;
using AzureMapsToolkit.Search;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace functions
{
    public static class PrepareOrder
    {
        [FunctionName("PrepareOrder")]
        public static async Task Run(
            [TimerTrigger("0 */2 * * * *")] TimerInfo timerInfo,
            [CosmosDB(
                "ColdStartChallenge", 
                "orders", 
                ConnectionStringSetting = "COSMOSDB_CONNECTIONSTRING"
            )] DocumentClient documentClient,
            ILogger log
        )
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
            var collectionUri = UriFactory.CreateDocumentCollectionUri("ColdStartChallenge", "orders");
            log.LogInformation($"Searching for accepted orders.");
            var query = documentClient.CreateDocumentQuery<Order>(collectionUri)
                .Where(p => p.Status == OrderStatus.Accepted)
                .OrderBy(x => x.Date)
                .Take(20)
                .AsDocumentQuery();

            var mapsClient = new AzureMapsServices(Environment.GetEnvironmentVariable("AZUREMAPS_APIKEY"));
            
            while (query.HasMoreResults) {
                foreach (Order order in await query.ExecuteNextAsync()) {
                    var response = await mapsClient.GetSearchAddress(new SearchAddressRequest {
                        Query = order.FullAddress,
                        Limit = 1
                    });
                    var result = response.Result.Results.FirstOrDefault(); 
                    if (result != null) {
                        order.Status = OrderStatus.Ready;
                        order.DeliveryPosition = new Position {
                            Latitude = result.Position.Lat,
                            Longitude = result.Position.Lon
                        };
                    } else {
                        order.Status = OrderStatus.Failed;
                    }
                    
                    await documentClient.UpsertDocumentAsync(collectionUri, order);
                }
            }
        }
    }
}
