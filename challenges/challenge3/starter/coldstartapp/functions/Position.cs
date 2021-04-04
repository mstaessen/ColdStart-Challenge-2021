using Newtonsoft.Json;

namespace functions
{
    public struct Position
    {
        [JsonProperty("lat")]
        public double Latitude { get; set; } 
        
        [JsonProperty("lng")]
        public double Longitude{ get; set; } 
    }
}