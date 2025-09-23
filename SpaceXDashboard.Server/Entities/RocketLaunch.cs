using Newtonsoft.Json;

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

    public class LaunchLinks
    {
        [JsonProperty("presskit")]
        public string Presskit { get; set; }

        [JsonProperty("article")]
        public string Article { get; set; }   

        [JsonProperty("wikipedia")]
        public string Wikipedia { get; set; }

        [JsonProperty("youtube_id")]
        public string YouTubeId { get; set; }

        [JsonProperty("webcast")]
        public string Webcast { get; set; }    

        [JsonProperty("patch")]
        public Patch Patch { get; set; }     
    }

    public class Patch
    {
        [JsonProperty("small")]
        public string MissionPatchSmall { get; set; }

        [JsonProperty("large")]
        public string MissionPatch { get; set; }
    }
}
