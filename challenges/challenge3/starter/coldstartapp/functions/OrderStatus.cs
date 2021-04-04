using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace functions
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum OrderStatus
    {
        Failed = -1,
        New = 0,
        Accepted = 1,
        Ready = 2,
    }
}