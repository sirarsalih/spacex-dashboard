using Newtonsoft.Json;

namespace SpaceXDashboard.Server.JsonEntities.RocketLaunch
{
    public class Patch
    {
        [JsonProperty("small")]
        public string MissionPatchSmall { get; set; }

        [JsonProperty("large")]
        public string MissionPatch { get; set; }
    }
}
