using Newtonsoft.Json;
using SpaceXDashboard.Server.JsonEntities;

namespace SpaceXDashboard.Server.Entities
{
    public class RocketLaunch
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("rocket")]
        public string RocketId { get; set; }

        [JsonProperty("date_utc")]
        public string DateUtcRaw { get; set; } //Launch date

        [JsonProperty("success")]
        public bool? Success { get; set; } //Null = upcoming launch        

        [JsonProperty("launchpad")]
        public string LaunchpadId { get; set; } //Launch location

        [JsonProperty("flight_number")]
        public int? FlightNumber { get; set; } //SpaceX flight number

        [JsonProperty("details")]
        public string Details { get; set; } //Text description of the launch    

        [JsonProperty("links")]
        public LaunchLinks Links { get; set; } //Web links including articles, Wikipedia, video and patch images
    }   
}
