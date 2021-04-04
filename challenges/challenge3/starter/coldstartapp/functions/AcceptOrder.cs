using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace functions
{
    public static class AcceptOrder
    {
        [FunctionName("AcceptOrder")]
        public static void Run(
            [QueueTrigger("customer-orders", Connection = "STORAGE_CONNECTIONSTRING")]  Order orderQueueItem,
            [CosmosDB(
                "ColdStartChallenge", 
                "orders", 
                ConnectionStringSetting = "COSMOSDB_CONNECTIONSTRING",
                CreateIfNotExists = true
            )] out Order order, 
            ILogger log
        )
        {
            log.LogInformation($"Store order {orderQueueItem.Id}.");
            order = orderQueueItem;
            order.Status = OrderStatus.Accepted;
        }
    }
}
