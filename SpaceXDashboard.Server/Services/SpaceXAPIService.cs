using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SpaceXDashboard.Server.Controllers;
using SpaceXDashboard.Server.Entities;
using System.Text.Json;

namespace SpaceXDashboard.Server.Services
{
    public interface ISpaceXAPIService
    {
        public Task<IEnumerable<RocketLaunch>> GetRocketLaunchesAsync();
        public Task<RocketLaunch?> GetRocketLaunchAsync(string id);
    }

    public class SpaceXAPIService : ISpaceXAPIService
    {
        private readonly ILogger<SpaceXAPIService> _logger;
        private readonly HttpClient _httpClient;

        public SpaceXAPIService(ILogger<SpaceXAPIService> logger, HttpClient httpClient)
        {
            _logger = logger;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<RocketLaunch>> GetRocketLaunchesAsync()
        {
            try
            {
                _logger.LogDebug("Fetching SpaceX rocket launches...");        
                var json = await _httpClient.GetStringAsync("https://api.spacexdata.com/v5/launches");

                var launches = JsonConvert.DeserializeObject<List<RocketLaunch>>(json);

                return launches ?? new List<RocketLaunch>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching SpaceX rocket launches");
                return Enumerable.Empty<RocketLaunch>();
            }
        }

        public async Task<RocketLaunch?> GetRocketLaunchAsync(string id)
        {
            try
            {
                _logger.LogDebug("Fetching SpaceX rocket launch with id {id}...", id);

                var json = await _httpClient.GetStringAsync(
                    $"https://api.spacexdata.com/v5/launches/{id}"
                );

                var launch = JsonConvert.DeserializeObject<RocketLaunch>(json);

                return launch;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching SpaceX rocket launch with id {id}", id);
                return null;
            }
        }
    }
}
