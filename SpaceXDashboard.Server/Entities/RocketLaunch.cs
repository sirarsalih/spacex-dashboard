using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.Entities
{
    public class RocketLaunch
    {
        public string Id { get; set; }
        [JsonPropertyName("rocket")]
        public string RocketId { get; set; }
        public string Name { get; set; }
        [JsonPropertyName("date_utc")]
        public string DateUtcRaw { get; set; } //Launch date

        public bool? Success { get; set; } //Null = upcoming launch        

        [JsonPropertyName("launchpad")]
        public string LaunchpadId { get; set; } //Launch location

        [JsonPropertyName("flight_number")]
        public int? FlightNumber { get; set; } //SpaceX flight number

        [JsonPropertyName("details")]
        public string Details { get; set; } //Text description of the launch

        [JsonPropertyName("links")]
        public LaunchLinks Links { get; set; } //Web links including articles, Wikipedia, video and patch images
    }

    public class LaunchLinks
    {
        [JsonPropertyName("presskit")]
        public string Presskit { get; set; }
        
        [JsonPropertyName("article_link")]
        public string Article { get; set; }

        [JsonPropertyName("wikipedia")]
        public string Wikipedia { get; set; }

        [JsonPropertyName("video_link")]
        public string Video { get; set; }

        [JsonPropertyName("mission_patch")]
        public string MissionPatch { get; set; }

        [JsonPropertyName("mission_patch_small")]
        public string MissionPatchSmall { get; set; }
    }    
}
