using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class PayloadWeight
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("kg")]
        public int Kg { get; set; }

        [JsonProperty("lb")]
        public int Lb { get; set; }
    }
}
