using Microsoft.AspNetCore.Mvc;
using SpaceXDashboard.Server.Controllers;
using SpaceXDashboard.Server.Entities;

namespace SpaceXDashboard.Server.Services
{
    public interface ISpaceXAPIService
    {
        public Task<IEnumerable<RocketLaunch>> GetRocketLaunchesAsync();
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
                var launches = await _httpClient.GetFromJsonAsync<List<RocketLaunch>>(
                    "https://api.spacexdata.com/v5/launches"
                );

                return launches ?? new List<RocketLaunch>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching SpaceX rocket launches");
                return Enumerable.Empty<RocketLaunch>();
            }
        }
    }
}
