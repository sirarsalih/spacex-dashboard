using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Mass
    {
        [JsonProperty("kg")]
        public int Kg { get; set; }

        [JsonProperty("lb")]
        public int Lb { get; set; }
    }
}
