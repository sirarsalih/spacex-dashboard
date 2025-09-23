import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [launches, setLaunches] = useState([]);
    const [filteredLaunches, setFilteredLaunches] = useState([]);
    const [selectedLaunch, setSelectedLaunch] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 20;

    useEffect(() => {
        populateRocketLaunchesData();
    }, []);

    // Live search effect
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredLaunches(launches);
        } else {
            const filtered = launches.filter(l =>
                l.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredLaunches(filtered);
            setCurrentPage(1);
        }
    }, [searchQuery, launches]);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentLaunches = filteredLaunches.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage);

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
            {selectedLaunch ? (
                <h1 id="launchLabel" style={{ marginTop: '-10px', textAlign: 'center' }}>
                    <div>
                        {selectedLaunch.links.patch.missionPatchSmall && (
                            <img
                                src={selectedLaunch.links.patch.missionPatchSmall}
                                alt={`${selectedLaunch.name} patch`}
                            />
                        )}
                    </div>
                    {selectedLaunch.name}
                    {selectedLaunch.links?.webcast ? (() => {
                        var videoUrl = "https://www.youtube.com/embed/" + selectedLaunch.links?.youTubeId + "?autoplay=1";
                        return (
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={videoUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        );
                    })() : null}
                </h1>
            ) : (
                <>
                    <img src="/spacex-logo-animation.gif" alt="App Logo" width="400" style={{ marginLeft: '80px' }} />
                    <div style={{ fontSize: '10px', marginLeft: '80px' }}>Logo design & animation by Dmitriy Ivanenko</div>
                </>
            )}

            {selectedLaunch ? (
                <div style={{ marginTop: '20px', padding: '10px' }}>
                    <p><strong>Launch ID</strong>: {selectedLaunch.id}</p>
                    <p><strong>Launch Time:</strong> {selectedLaunch.dateUtcRaw === "null" ? "TBD" : formatDate(selectedLaunch.dateUtcRaw)}</p>
                    <p><strong>Outcome: </strong>
                        {selectedLaunch.success === null && selectedLaunch.dateUtc !== null
                            ? "Unknown"
                            : selectedLaunch.success === null && selectedLaunch.dateUtc === null
                                ? "Not launched"
                                : selectedLaunch.success === true
                                    ? "Success"
                                    : "Failed"}
                    </p>
                    <p><strong>Details: </strong>{selectedLaunch.details && selectedLaunch.details.trim() !== ""
                        ? selectedLaunch.details
                        : "N/A"}</p>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={handleBackToList}>Back to List</button>
                    </div>
                </div>
            ) : (
                <>
                    {launches.length === 0 ? (
                        <p><em>Loading rocket launches...</em></p>
                    ) : (
                        <>
                            {/* Live Search Input */}
                            <div style={{ textAlign: 'center', marginBottom: '10px', marginTop: '15px' }}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by launch name..."
                                    style={{ padding: '5px', width: '525px' }}
                                />
                            </div>

                            <table className="table table-striped" aria-labelledby="tableLabel">
                                <thead>
                                    <tr style={{ textAlign: 'left' }}>
                                        <th>Launch Name</th>
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
                                            <td>
                                                {launch.links.patch.missionPatchSmall && (
                                                    <img
                                                        src={launch.links.patch.missionPatchSmall}
                                                        alt={`${launch.name} patch`}
                                                        style={{
                                                            width: '30px',
                                                            height: '30px',
                                                            marginRight: '8px',
                                                            verticalAlign: 'middle'
                                                        }}
                                                    />
                                                )} {launch.name}
                                            </td>
                                            <td>{launch.dateUtcRaw === "null" ? "TBD" : formatDate(launch.dateUtcRaw)}</td>
                                            <td>
                                                {launch.success === null && launch.dateUtcRaw !== null
                                                    ? "Unknown"
                                                    : launch.success === null && launch.dateUtcRaw === null
                                                        ? "Not launched"
                                                        : launch.success === true
                                                            ? "Success"
                                                            : "Failed"}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div style={{ marginTop: '10px', textAlign: 'center' }}>
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

    async function populateRocketLaunchesData(retries = 5, delay = 2000) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch('rocketlaunches');
                if (response.ok) {
                    const data = await response.json();
                    setLaunches(data);
                    setFilteredLaunches(data); // initialize filtered list
                    return; // Success, stop retrying
                }
            } catch (err) {
                console.error("API not ready yet, retrying...", err);
            }
            // Wait before retry
            await new Promise(res => setTimeout(res, delay));
        }
        console.error("Failed to fetch rocket launches after retries");
    }
}

export default App;
