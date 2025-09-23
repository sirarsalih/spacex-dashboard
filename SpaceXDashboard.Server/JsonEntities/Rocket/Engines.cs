using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Engines
    {
        [JsonPropertyName("isp")]
        public Isp Isp { get; set; }

        [JsonPropertyName("thrust_sea_level")]
        public Thrust ThrustSeaLevel { get; set; }

        [JsonPropertyName("thrust_vacuum")]
        public Thrust ThrustVacuum { get; set; }

        [JsonPropertyName("number")]
        public int Number { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("version")]
        public string Version { get; set; }

        [JsonPropertyName("layout")]
        public string Layout { get; set; }

        [JsonPropertyName("engine_loss_max")]
        public int EngineLossMax { get; set; }

        [JsonPropertyName("propellant_1")]
        public string Propellant1 { get; set; }

        [JsonPropertyName("propellant_2")]
        public string Propellant2 { get; set; }

        [JsonPropertyName("thrust_to_weight")]
        public double ThrustToWeight { get; set; }
    }
}
