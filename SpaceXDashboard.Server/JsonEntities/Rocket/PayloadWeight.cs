using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class PayloadWeight
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("kg")]
        public int Kg { get; set; }

        [JsonPropertyName("lb")]
        public int Lb { get; set; }
    }
}
