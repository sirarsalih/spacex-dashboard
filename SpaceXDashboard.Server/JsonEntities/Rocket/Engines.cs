using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Engines
    {
        [JsonProperty("isp")]
        public Isp Isp { get; set; }

        [JsonProperty("thrust_sea_level")]
        public Thrust ThrustSeaLevel { get; set; }

        [JsonProperty("thrust_vacuum")]
        public Thrust ThrustVacuum { get; set; }

        [JsonProperty("number")]
        public int Number { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("version")]
        public string Version { get; set; }

        [JsonProperty("layout")]
        public string Layout { get; set; }

        [JsonProperty("engine_loss_max")]
        public int EngineLossMax { get; set; }

        [JsonProperty("propellant_1")]
        public string Propellant1 { get; set; }

        [JsonProperty("propellant_2")]
        public string Propellant2 { get; set; }

        [JsonProperty("thrust_to_weight")]
        public double ThrustToWeight { get; set; }
    }
}
