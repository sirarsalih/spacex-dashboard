using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class CompositeFairing
    {
        [JsonPropertyName("height")]
        public Dimension Height { get; set; }

        [JsonPropertyName("diameter")]
        public Dimension Diameter { get; set; }
    }
}
