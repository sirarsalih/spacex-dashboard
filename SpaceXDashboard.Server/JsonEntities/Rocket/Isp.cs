using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Isp
    {
        [JsonPropertyName("sea_level")]
        public int SeaLevel { get; set; }

        [JsonPropertyName("vacuum")]
        public int Vacuum { get; set; }
    }
}
