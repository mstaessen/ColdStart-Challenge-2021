using System;
using System.Collections.Specialized;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace functions
{
    public static class ReceiveOrder
    {
        [FunctionName("ReceiveOrder")]
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
        }
    }

    public class Order
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
        
        [JsonProperty("user")]
        public string User { get; set; }
        
        [JsonProperty("date")]
        public DateTime Date { get; set; }
        
        [JsonProperty("icecream")]
        public Icecream Icecream { get; set; }
        
        [JsonProperty("status")]
        public OrderStatus Status { get; set; }
        
        [JsonProperty("driver")]
        public Driver Driver { get; set; }
        
        [JsonProperty("fullAddress")]
        public string FullAddress { get; set; }
        
        [JsonProperty("lastPosition")]
        public Position LastPosition { get; set; }
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum OrderStatus
    {
        New,
        Accepted
    }

    public struct Position
    {
        [JsonProperty("lat")]
        public double Latitude { get; set; } 
        
        [JsonProperty("lng")]
        public double Longitude{ get; set; } 
    }

    public class Icecream
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        
        [JsonProperty("name")]
        public string Name { get; set; }
        
        [JsonProperty("description")]
        public string Description { get; set; }
        
        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }
    }

    public class Driver
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
        
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("imageUrl")]            
        public string ImageUrl { get; set; }
    }
}
