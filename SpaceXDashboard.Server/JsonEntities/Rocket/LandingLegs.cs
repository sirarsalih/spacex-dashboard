using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class LandingLegs
    {
        [JsonPropertyName("number")]
        public int Number { get; set; }

        [JsonPropertyName("material")]
        public string Material { get; set; }
    }
}
