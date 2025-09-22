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

        [HttpGet(Name = "GetRocketLaunches")]
        public async Task<IEnumerable<RocketLaunch>> GetAsync()
        {
            _logger.LogDebug("Fetching SpaceX rocket launches from API...");
            return await _spaceXAPIService.GetRocketLaunchesAsync();
        }
    }
}
