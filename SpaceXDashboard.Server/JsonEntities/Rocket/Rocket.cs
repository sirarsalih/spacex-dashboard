using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.Rocket
{
    public class Rocket
    {
        [JsonProperty("height")]
        public Dimension Height { get; set; }

        [JsonProperty("diameter")]
        public Dimension Diameter { get; set; }

        [JsonProperty("mass")]
        public Mass Mass { get; set; }

        [JsonProperty("first_stage")]
        public Stage FirstStage { get; set; }

        [JsonProperty("second_stage")]
        public Stage SecondStage { get; set; }

        [JsonProperty("engines")]
        public Engines Engines { get; set; }

        [JsonProperty("landing_legs")]
        public LandingLegs LandingLegs { get; set; }

        [JsonProperty("payload_weights")]
        public List<PayloadWeight> PayloadWeights { get; set; }

        [JsonProperty("flickr_images")]
        public List<string> FlickrImages { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("active")]
        public bool Active { get; set; }

        [JsonProperty("stages")]
        public int Stages { get; set; }

        [JsonProperty("boosters")]
        public int Boosters { get; set; }

        [JsonProperty("cost_per_launch")]
        public long CostPerLaunch { get; set; }

        [JsonProperty("success_rate_pct")]
        public int SuccessRatePct { get; set; }

        [JsonProperty("first_flight")]
        public string FirstFlight { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("company")]
        public string Company { get; set; }

        [JsonProperty("wikipedia")]
        public string Wikipedia { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }
    }     
}
