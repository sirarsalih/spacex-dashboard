using FakeItEasy;
using Microsoft.Extensions.Logging;
using SpaceXDashboard.Server.Controllers;
using SpaceXDashboard.Server.JsonEntities.RocketLaunch;
using SpaceXDashboard.Server.Services;
using Xunit;

namespace SpaceXDashboard.ServerTests
{
    public class RocketLaunchesControllerTests
    {
        private readonly ILogger<RocketLaunchesController> _fakeLogger;
        private readonly ISpaceXAPIService _fakeService;
        private readonly RocketLaunchesController _controller;

        public RocketLaunchesControllerTests()
        {
            //Setup
            _fakeLogger = A.Fake<ILogger<RocketLaunchesController>>();
            _fakeService = A.Fake<ISpaceXAPIService>();
            _controller = new RocketLaunchesController(_fakeLogger, _fakeService);
        }

        [Fact]
        public async Task Getting_All_Rocket_Launches_Should_Call_SpaceX_Get_Rocket_Launches_API_Service_Once()
        {
            //Arrange
            A.CallTo(() => _fakeService.GetRocketLaunchesAsync()).Returns(new List<RocketLaunch>());

            //Act
            await _controller.GetAsync();
            
            //Assert
            A.CallTo(() => _fakeService.GetRocketLaunchesAsync()).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task Getting_Single_Rocket_Launch_With_Id_Should_Call_SpaceX_Get_Rocket_Launch_With_Id_API_Service_Once()
        {
            //Arrange
            A.CallTo(() => _fakeService.GetRocketLaunchAsync("5eb87d24ffd86e000604b36f")).Returns(new RocketLaunch());

            //Act
            await _controller.GetAsync("5eb87d24ffd86e000604b36f");

            //Assert
            A.CallTo(() => _fakeService.GetRocketLaunchAsync("5eb87d24ffd86e000604b36f")).MustHaveHappenedOnceExactly();
        }
    }
}
