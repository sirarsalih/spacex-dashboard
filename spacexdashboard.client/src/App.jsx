import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [launches, setLaunches] = useState([]);

    useEffect(() => {
        populateRocketLaunchesData();
    }, []);

    const contents = launches === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>DateUtc</th>
                    <th>Success</th>
                </tr>
            </thead>
            <tbody>
                {launches.map(launch =>
                    <tr key={launch.id}>
                        <td>{launch.id}</td>
                        <td>{launch.name}</td>
                        <td>{launch.date_utc === "null" ? "TBD" : launch.date_utc}</td>
                        <td>
                            {launch.success === null && launch.dateUtc !== "null"
                                ? "Outcome not known"
                                : launch.success === null && launch.dateUtc === "null"
                                    ? "Not launched"
                                    : launch.success.toString()}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Rocket launches</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateRocketLaunchesData() {
        const response = await fetch('rocketlaunches');
        if (response.ok) {
            const data = await response.json();
            setLaunches(data);
        }
    }
}

export default App;