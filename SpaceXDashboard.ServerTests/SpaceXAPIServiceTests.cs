using FakeItEasy;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SpaceXDashboard.Server.JsonEntities.Rocket;
using SpaceXDashboard.Server.JsonEntities.RocketLaunch;
using SpaceXDashboard.Server.Services;
using System.Net;

public class SpaceXAPIServiceTests
{
    private readonly ILogger<SpaceXAPIService> _fakeLogger;

    public SpaceXAPIServiceTests()
    {
        //Setup
        _fakeLogger = A.Fake<ILogger<SpaceXAPIService>>();
    }

    [Fact]
    public async Task Getting_All_Rocket_Launches_Should_Call_HttpClient_And_Return_All_Rocket_Launches()
    {
        //Arrange
        var launches = new List<RocketLaunch> { new() { Id = "5eb87d24ffd86e000604b36f", Name = "Falcon 9 Test Launch" } };
        var response = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonConvert.SerializeObject(launches))
        };

        var handler = new FakeHttpMessageHandler(response);
        var httpClient = new HttpClient(handler);
        var logger = A.Fake<ILogger<SpaceXAPIService>>();

        var service = new SpaceXAPIService(logger, httpClient);

        //Act
        var result = await service.GetRocketLaunchesAsync();

        //Assert
        Assert.Single(result);
        Assert.Equal("Falcon 9 Test Launch", result.First().Name);
    }

    [Fact]
    public async Task Getting_Single_Rocket_Launch_With_Id_Should_Call_HttpClient_With_Correct_Id()
    {
        //Arrange
        var launch = new RocketLaunch { Id = "5eb87d24ffd86e000604b36f", Name = "Falcon 9 Test Launch" };
        var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonConvert.SerializeObject(launch))
        };
        var handler = new FakeHttpMessageHandler(responseMessage);
        var httpClient = new HttpClient(handler);
        var service = new SpaceXAPIService(_fakeLogger, httpClient);

        //Act
        var result = await service.GetRocketLaunchAsync("5eb87d24ffd86e000604b36f");

        //Assert
        Assert.NotNull(result);
        Assert.Equal("5eb87d24ffd86e000604b36f", result.Id);
        Assert.Equal("Falcon 9 Test Launch", result.Name);
    }

    [Fact]
    public async Task Getting_Single_Rocket_With_Id_Should_Call_HttpClient_With_Correct_Id()
    {
        //Arrange
        var rocket = new Rocket { Id = "5e9d0d95eda69973a809d1ec", Name = "Falcon 9" };
        var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent(JsonConvert.SerializeObject(rocket))
        };
        var handler = new FakeHttpMessageHandler(responseMessage);
        var httpClient = new HttpClient(handler);
        var service = new SpaceXAPIService(_fakeLogger, httpClient);

        //Act
        var result = await service.GetRocketAsync("R1");

        //Assert
        Assert.NotNull(result);
        Assert.Equal("5e9d0d95eda69973a809d1ec", result.Id);
        Assert.Equal("Falcon 9", result.Name);
    }

    public class FakeHttpMessageHandler : HttpMessageHandler
    {
        private readonly HttpResponseMessage _response;

        public FakeHttpMessageHandler(HttpResponseMessage response)
        {
            _response = response;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_response);
        }
    }
}
