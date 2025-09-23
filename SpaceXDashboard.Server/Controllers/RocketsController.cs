using Microsoft.AspNetCore.Mvc;
using SpaceXDashboard.Server.JsonEntities.Rocket;
using SpaceXDashboard.Server.Services;

namespace SpaceXDashboard.Server.Controllers
{
    [ApiController]
    [Route("rockets")]
    public class RocketsController : ControllerBase
    {
        private readonly ILogger<RocketsController> _logger;
        private readonly ISpaceXAPIService _spaceXAPIService;

        public RocketsController(ILogger<RocketsController> logger, ISpaceXAPIService spaceXAPIService)
        {
            _logger = logger;
            _spaceXAPIService = spaceXAPIService;
        }

        [HttpGet("{id}")]
        public async Task<Rocket?> GetAsync(string id)
        {
            _logger.LogDebug("Fetching SpaceX rocket launch from API...");
            return await _spaceXAPIService.GetRocketAsync(id);
        }
    }
}
