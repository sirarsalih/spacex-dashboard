using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SpaceXDashboard.Server.Entities
{
    public class RocketLaunch
    {
        public string Id { get; set; }
        public string Name { get; set; }
        [JsonPropertyName("date_utc")]
        public string DateUtcRaw { get; set; }

        public bool? Success { get; set; } //Null = upcoming launch
    }
}
