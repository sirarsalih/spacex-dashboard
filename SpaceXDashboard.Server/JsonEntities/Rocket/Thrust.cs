using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Thrust
    {
        [JsonProperty("kN")]
        public int KN { get; set; }

        [JsonProperty("lbf")]
        public int Lbf { get; set; }
    }
}
