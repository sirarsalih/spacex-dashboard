using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.RocketLaunch
{
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
}
