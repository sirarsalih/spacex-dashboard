using FakeItEasy;
using Microsoft.Extensions.Logging;
using SpaceXDashboard.Server.Controllers;
using SpaceXDashboard.Server.JsonEntities.Rocket;
using SpaceXDashboard.Server.JsonEntities.RocketLaunch;
using SpaceXDashboard.Server.Services;
using Xunit;

namespace SpaceXDashboard.ServerTests
{
    public class RocketsControllerTests
    {
        private readonly ILogger<RocketsController> _fakeLogger;
        private readonly ISpaceXAPIService _fakeService;
        private readonly RocketsController _controller;

        public RocketsControllerTests()
        {
            //Setup
            _fakeLogger = A.Fake<ILogger<RocketsController>>();
            _fakeService = A.Fake<ISpaceXAPIService>();
            _controller = new RocketsController(_fakeLogger, _fakeService);
        }

        [Fact]
        public async Task Getting_Single_Rocket_With_Id_Should_Call_SpaceX_Get_Rocket_With_Id_API_Service_Once()
        {
            //Arrange
            A.CallTo(() => _fakeService.GetRocketAsync("5e9d0d95eda69973a809d1ec")).Returns(new Rocket());

            //Act
            await _controller.GetAsync("5e9d0d95eda69973a809d1ec");

            //Assert
            A.CallTo(() => _fakeService.GetRocketAsync("5e9d0d95eda69973a809d1ec")).MustHaveHappenedOnceExactly();
        }
    }
}
