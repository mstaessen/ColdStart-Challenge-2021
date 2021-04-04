using System;
using Newtonsoft.Json;

namespace functions
{
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
        
        [JsonProperty("deliveryPosition")]
        public Position DeliveryPosition { get; set; }
        
        [JsonProperty("lastPosition")]
        public Position LastPosition { get; set; }
    }
}