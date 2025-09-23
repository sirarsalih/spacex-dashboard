using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Stage
    {
        [JsonProperty("thrust_sea_level")]
        public Thrust ThrustSeaLevel { get; set; }

        [JsonProperty("thrust_vacuum")]
        public Thrust ThrustVacuum { get; set; }

        [JsonProperty("thrust")]
        public Thrust Thrust { get; set; } // For second stage only

        [JsonProperty("reusable")]
        public bool Reusable { get; set; }

        [JsonProperty("engines")]
        public int Engines { get; set; }

        [JsonProperty("fuel_amount_tons")]
        public double FuelAmountTons { get; set; }

        [JsonProperty("burn_time_sec")]
        public int? BurnTimeSec { get; set; } // Can be null

        [JsonProperty("payloads")]
        public Payloads Payloads { get; set; } // Second stage only
    }
}
