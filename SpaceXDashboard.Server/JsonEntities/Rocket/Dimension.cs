using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Dimension
    {
        [JsonProperty("meters")]
        public double Meters { get; set; }

        [JsonProperty("feet")]
        public double Feet { get; set; }
    }
}
