using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class LandingLegs
    {
        [JsonProperty("number")]
        public int Number { get; set; }

        [JsonProperty("material")]
        public string Material { get; set; }
    }
}
