using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class CompositeFairing
    {
        [JsonProperty("height")]
        public Dimension Height { get; set; }

        [JsonProperty("diameter")]
        public Dimension Diameter { get; set; }
    }
}
