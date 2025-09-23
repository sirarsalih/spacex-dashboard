using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Isp
    {
        [JsonProperty("sea_level")]
        public int SeaLevel { get; set; }

        [JsonProperty("vacuum")]
        public int Vacuum { get; set; }
    }
}
