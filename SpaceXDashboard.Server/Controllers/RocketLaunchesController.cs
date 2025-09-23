using Microsoft.AspNetCore.Mvc;
using SpaceXDashboard.Server.Entities;
using SpaceXDashboard.Server.Services;

namespace SpaceXDashboard.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RocketLaunchesController : ControllerBase
    {
        private readonly ILogger<RocketLaunchesController> _logger;
        private readonly ISpaceXAPIService _spaceXAPIService;

        public RocketLaunchesController(ILogger<RocketLaunchesController> logger, ISpaceXAPIService spaceXAPIService)
        {
            _logger = logger;
            _spaceXAPIService = spaceXAPIService;
        }

        [HttpGet]
        public async Task<IEnumerable<RocketLaunch>> GetAsync()
        {
            _logger.LogDebug("Fetching SpaceX rocket launches from API...");
            var launches = await _spaceXAPIService.GetRocketLaunchesAsync();

            return launches
                .Where(l => !string.IsNullOrEmpty(l.DateUtcRaw) && l.DateUtcRaw != "null")
                .OrderByDescending(l => DateTime.Parse(l.DateUtcRaw))
                .ToList();
        }

        [HttpGet("{id}")]
        public async Task<RocketLaunch?> GetAsync(string id)
        {
            _logger.LogDebug("Fetching SpaceX rocket launch from API...");
            return await _spaceXAPIService.GetRocketLaunchAsync(id);
        }
    }
}
