import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [launches, setLaunches] = useState([]);
    const [selectedLaunch, setSelectedLaunch] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    useEffect(() => {
        populateRocketLaunchesData();
    }, []);

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

    const handleLaunchClick = async (launchId) => {
        try {
            const response = await fetch(`rocketlaunches/${launchId}`);
            if (response.ok) {
                const data = await response.json();
                setSelectedLaunch(data);
            } else {
                setSelectedLaunch(null);
            }
        } catch (error) {
            console.error("Error fetching launch details:", error);
            setSelectedLaunch(null);
        }
    };

    // Back button preserves currentPage
    const handleBackToList = () => {
        setSelectedLaunch(null);
    };

    return (
        <div>
            <h1 id="tableLabel">Rocket launches</h1>

            {selectedLaunch ? (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>                    
                    <h2>Rocket Launch Details</h2>
                    <p><strong>Id:</strong> {selectedLaunch.id}</p>
                    <p><strong>Name:</strong> {selectedLaunch.name}</p>
                    <p><strong>DateUtc:</strong> {selectedLaunch.date_utc === "null" ? "TBD" : selectedLaunch.date_utc}</p>
                    <p><strong>Success: </strong>
                        {selectedLaunch.success === null && selectedLaunch.dateUtc !== "null"
                            ? "Outcome not known"
                            : selectedLaunch.success === null && selectedLaunch.dateUtc === "null"
                                ? "Not launched"
                                : selectedLaunch.success.toString()}
                    </p>
                    <button onClick={handleBackToList}>Back to List</button>
                </div>
            ) : (
                <>
                    {launches.length === 0 ? (
                        <p><em>Loading... Please refresh page.</em></p>
                    ) : (
                        <>
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
                                        <tr
                                            key={launch.id}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleLaunchClick(launch.id)}
                                        >
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
                        </>
                    )}
                </>
            )}
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
