import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [launches, setLaunches] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30; // number of launches per page

    useEffect(() => {
        populateRocketLaunchesData();
    }, []);

    // calculate current page items
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentLaunches = launches.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(launches.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const contents = launches.length === 0
        ? <p><em>Loading... Please refresh.</em></p>
        : <>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>DateUtc</th>
                        <th>Success</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLaunches.map(launch =>
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
            </table>

            <div style={{ marginTop: '10px' }}>
                <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
                <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>;

    return (
        <div>
            <h1 id="tableLabel">Rocket launches</h1>
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
