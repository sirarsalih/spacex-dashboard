using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Payloads
    {
        [JsonPropertyName("composite_fairing")]
        public CompositeFairing CompositeFairing { get; set; }

        [JsonPropertyName("option_1")]
        public string Option1 { get; set; }
    }
}
