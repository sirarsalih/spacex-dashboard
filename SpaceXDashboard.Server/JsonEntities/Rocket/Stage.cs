using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Stage
    {
        [JsonPropertyName("thrust_sea_level")]
        public Thrust ThrustSeaLevel { get; set; }

        [JsonPropertyName("thrust_vacuum")]
        public Thrust ThrustVacuum { get; set; }

        [JsonPropertyName("thrust")]
        public Thrust Thrust { get; set; } // For second stage only

        [JsonPropertyName("reusable")]
        public bool Reusable { get; set; }

        [JsonPropertyName("engines")]
        public int Engines { get; set; }

        [JsonPropertyName("fuel_amount_tons")]
        public double FuelAmountTons { get; set; }

        [JsonPropertyName("burn_time_sec")]
        public int? BurnTimeSec { get; set; } // Can be null

        [JsonPropertyName("payloads")]
        public Payloads Payloads { get; set; } // Second stage only
    }
}
