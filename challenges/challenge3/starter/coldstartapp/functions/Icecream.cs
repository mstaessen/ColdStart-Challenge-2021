using Newtonsoft.Json;

namespace functions
{
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
}