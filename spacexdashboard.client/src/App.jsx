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

            {selectedLaunch ? (<h1 id="launchLabel">Rocket Launch Details</h1>) : (<><h1 id="tableLabel">Rocket Launches</h1></>)}

            {selectedLaunch ? (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>                                 
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
                                        <th>Rocket Name</th>
                                        <th>Launch Time</th>
                                        <th>Outcome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentLaunches.map(launch =>
                                        <tr
                                            key={launch.id}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleLaunchClick(launch.id)}
                                        >
                                            <td>{launch.name}</td>
                                            <td>{launch.date_utc === "null" ? "TBD" : formatDate(launch.date_utc)}</td>
                                            <td>
                                                {launch.success === null && launch.dateUtc !== null
                                                    ? "Unknown"
                                                    : launch.success === null && launch.dateUtc === null
                                                        ? "Not launched"
                                                        : launch.success === true
                                                            ? "Success"
                                                            : "Failed"}
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

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // convert 0 to 12
        const strHours = String(hours).padStart(2, '0');

        // Get timezone abbreviation using Intl.DateTimeFormat
        const timeZone = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
            .formatToParts(date)
            .find(part => part.type === 'timeZoneName')?.value || '';

        return `${day}-${month}-${year} ${strHours}:${minutes} ${ampm} ${timeZone}`;
    }

    async function populateRocketLaunchesData() {
        const response = await fetch('rocketlaunches');
        if (response.ok) {
            const data = await response.json();
            setLaunches(data);
        }
    }
}

export default App;
