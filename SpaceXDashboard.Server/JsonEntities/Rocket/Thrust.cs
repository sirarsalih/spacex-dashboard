using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Thrust
    {
        [JsonPropertyName("kN")]
        public int KN { get; set; }

        [JsonPropertyName("lbf")]
        public int Lbf { get; set; }
    }
}
