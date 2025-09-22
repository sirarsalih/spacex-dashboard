using Microsoft.AspNetCore.Mvc;
using SpaceXDashboard.Server.Entities;

namespace SpaceXDashboard.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RocketLaunchesController : ControllerBase
    {
        private readonly ILogger<RocketLaunchesController> _logger;

        public RocketLaunchesController(ILogger<RocketLaunchesController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetRocketLaunches")]
        public IEnumerable<Entities.RocketLaunch> Get()
        {
            return new List<RocketLaunch>();
        }
    }
}
