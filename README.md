# SpaceX Dashboard
SpaceX Dashboard is a convenient website made for searching SpaceX rocket launches and fetching important information related to the launches, including rocket information. The website calls the open source SpaceX API to fetch and display this information in a user friendly way.

## SpaceX API
The documentation for the open source SpaceX API is found here:

https://github.com/r-spacex/SpaceX-API

## Features
SpaceX Dashboard fetches all rocket launches from the SpaceX API and displays it to the user. You can search through these launches and click on each launch to display details related to the launch. We receive rich information from the SpaceX API, including links to YouTube videos and images of the rockets. In other words, there is a lot of nice information to play around with and learn from!

## Tech And Frameworks Used
SpaceX Dashboard is built using the following tech and frameworks:

- .NET 9
- ASP.NET Core Web API
- React 19
- Vite 7
- XUnit
- FakeItEasy

## Future Improvements

- Add JSON mapping assertion unit tests
- Add unit tests for the front-end
- Split the front-end into more components
- Add filtering to the rocket launches table
- Add cross searching
- Setup CI/CD pipelines
- Deploy the site to Azure as an app service
