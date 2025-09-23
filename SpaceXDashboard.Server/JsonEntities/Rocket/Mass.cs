using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Mass
    {
        [JsonPropertyName("kg")]
        public int Kg { get; set; }

        [JsonPropertyName("lb")]
        public int Lb { get; set; }
    }
}
