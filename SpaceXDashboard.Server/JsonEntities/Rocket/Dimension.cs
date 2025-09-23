using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Dimension
    {
        [JsonPropertyName("meters")]
        public double Meters { get; set; }

        [JsonPropertyName("feet")]
        public double Feet { get; set; }
    }
}
