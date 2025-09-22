import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [launches, setLaunches] = useState();

    useEffect(() => {
        populateRocketLaunchesData();
    }, []);

    const contents = launches === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {launches.map(launch =>
                    <tr key={launch.date}>
                        <td>{launch.date}</td>
                        <td>{launch.temperatureC}</td>
                        <td>{launch.temperatureF}</td>
                        <td>{launch.summary}</td>
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