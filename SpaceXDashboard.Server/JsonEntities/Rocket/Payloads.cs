using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Payloads
    {
        [JsonProperty("composite_fairing")]
        public CompositeFairing CompositeFairing { get; set; }

        [JsonProperty("option_1")]
        public string Option1 { get; set; }
    }
}
