using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SpaceXDashboard.Server.Controllers;
using SpaceXDashboard.Server.JsonEntities.Rocket;
using SpaceXDashboard.Server.JsonEntities.RocketLaunch;
using System.Text.Json;

namespace SpaceXDashboard.Server.Services
{
    public interface ISpaceXAPIService
    {
        public Task<IEnumerable<RocketLaunch>> GetRocketLaunchesAsync();
        public Task<RocketLaunch?> GetRocketLaunchAsync(string id);
        public Task<Rocket?> GetRocketAsync(string id);
    }

    public class SpaceXAPIService : ISpaceXAPIService
    {
        private readonly ILogger<SpaceXAPIService> _logger;
        private readonly HttpClient _httpClient;
        private const string _ROCKET_LANUCHES_API_BASE_URL = "https://api.spacexdata.com/v5/launches";
        private const string _ROCKETS_API_BASE_URL = "https://api.spacexdata.com/v4/rockets"; //As of today, there is no v5

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
                var json = await _httpClient.GetStringAsync(_ROCKET_LANUCHES_API_BASE_URL);

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
                    $"{_ROCKET_LANUCHES_API_BASE_URL}/{id}"
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

        public async Task<Rocket?> GetRocketAsync(string id)
        {
            try
            {
                _logger.LogDebug("Fetching SpaceX rocket with id {id}...", id);

                var json = await _httpClient.GetStringAsync(
                    $"{_ROCKETS_API_BASE_URL}/{id}"
                );

                var rocket = JsonConvert.DeserializeObject<Rocket>(json);

                return rocket;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching SpaceX rocket with id {id}", id);
                return null;
            }
        }
    }
}
