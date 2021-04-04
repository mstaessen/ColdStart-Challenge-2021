using System;
using Newtonsoft.Json;

namespace functions
{
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