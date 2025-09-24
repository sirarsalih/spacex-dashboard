import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [launches, setLaunches] = useState([]);
    const [filteredLaunches, setFilteredLaunches] = useState([]);
    const [selectedLaunch, setSelectedLaunch] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const itemsPerPage = 15;

    useEffect(() => {
        populateRocketLaunchesData();

        // Handle browser back/forward
        const handlePopState = (event) => {
            if (event.state?.launchId) {
                handleLaunchClick(event.state.launchId, false);
            } else {
                setSelectedLaunch(null);
            }
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    // Filter + Sort
    useEffect(() => {
        let filtered = launches;
        if (searchQuery.trim() !== "") {
            filtered = launches.filter(l =>
                l.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortConfig.key) {
            filtered = [...filtered].sort((a, b) => {
                let aValue, bValue;
                switch (sortConfig.key) {
                    case 'name':
                        aValue = a.name.toLowerCase();
                        bValue = b.name.toLowerCase();
                        break;
                    case 'date':
                        aValue = a.dateUtcRaw === "null" ? 0 : new Date(a.dateUtcRaw).getTime();
                        bValue = b.dateUtcRaw === "null" ? 0 : new Date(b.dateUtcRaw).getTime();
                        break;
                    case 'outcome':
                        aValue = a.success === null ? (a.dateUtcRaw === null ? 0 : 1) : a.success ? 2 : 3;
                        bValue = b.success === null ? (b.dateUtcRaw === null ? 0 : 1) : b.success ? 2 : 3;
                        break;
                    default:
                        aValue = '';
                        bValue = '';
                }
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setFilteredLaunches(filtered);
        setCurrentPage(1);
    }, [searchQuery, launches, sortConfig]);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentLaunches = filteredLaunches.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage);

    const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const handlePrev = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

    // Fetch launch + rocket details
    const handleLaunchClick = async (launchId, push = true) => {
        try {
            // Fetch launch
            const launchResponse = await fetch(`/rocketlaunches/${launchId}`);      
            if (!launchResponse.ok) throw new Error(await launchResponse.text());
            const launchData = await launchResponse.json();
   
            // Fetch rocket
            let rocketData = null;
            if (launchData?.rocketId) {
                const rocketResponse = await fetch(`/rockets/${launchData.rocketId}`);        
                if (rocketResponse.ok) rocketData = await rocketResponse.json();
            }

            setSelectedLaunch({ ...launchData, rocketData });

            if (push) window.history.pushState({ launchId }, "", `${launchId}`);
        } catch (err) {
            console.error('Failed to fetch launch or rocket data:', err);
            setSelectedLaunch(null);
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            {selectedLaunch ? (
                <div style={{ textAlign: 'center', marginTop: '-10px' }}>
                    {selectedLaunch.links?.patch?.missionPatchSmall && (
                        <img src={selectedLaunch.links.patch.missionPatchSmall} alt={`${selectedLaunch.name} patch`} />
                    )}
                    <h1>{selectedLaunch.name}</h1>
                    {selectedLaunch.links?.webcast && (
                        <div style={{ marginTop: '20px' }}>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${selectedLaunch.links.youTubeId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    <div style={{ marginTop: '20px', padding: '10px', textAlign: 'left', maxWidth: '700px', margin: 'auto' }}>
                        <p><strong>Launch ID:</strong> {selectedLaunch.id}</p>
                        <p><strong>Launch Time:</strong> {selectedLaunch.dateUtcRaw === "null" ? "TBD" : formatDate(selectedLaunch.dateUtcRaw)}</p>
                        <p><strong>Outcome:</strong> {selectedLaunch.success === null
                            ? selectedLaunch.dateUtcRaw === null ? "Not launched" : "Unknown"
                            : selectedLaunch.success ? "Success" : "Failed"}</p>
                        <p><strong>Details:</strong> {selectedLaunch.details?.trim() || "N/A"}</p>

                        {selectedLaunch.rocketData && (
                            <>
                                <h2>Rocket Details</h2>                                
                                <p><strong>Name:</strong> {selectedLaunch.rocketData.name}</p>
                                <p><strong>Type:</strong> {selectedLaunch.rocketData.type}</p>
                                <p><strong>Country:</strong> {selectedLaunch.rocketData.country}</p>
                                <p><strong>Company:</strong> {selectedLaunch.rocketData.company}</p>
                                <p><strong>Description:</strong> {selectedLaunch.rocketData.description}</p>     
                                {selectedLaunch.rocketData.flickrImages?.length > 0 && (
                                    <div>
                                        <p><strong>Images:</strong></p>
                                        <div
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                                gap: '10px',
                                                marginTop: '10px'
                                            }}
                                        >
                                            {selectedLaunch.rocketData.flickrImages.map((url, index) => (
                                                <a
                                                    key={index}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`Rocket image ${index + 1}`}
                                                        style={{
                                                            width: '100%',
                                                            height: '150px',
                                                            objectFit: 'cover',
                                                            borderRadius: '6px',
                                                            transition: 'transform 0.2s',
                                                            cursor: 'pointer'
                                                        }}
                                                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <img src="/spacex-logo.png" alt="App Logo" width="300" style={{ marginLeft: '185px', marginTop: '-50px' }} />
                 

                    {launches.length === 0 ? (
                        <p><em>Loading rocket launches...</em></p>
                    ) : (
                        <>
                            <div style={{ marginBottom: '10px', marginTop: '15px', marginLeft: '17px' }}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by sat name..."
                                    style={{ padding: '5px', width: '622px', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div style={{ display: 'inline-block', width: '800px', maxHeight: '600px', overflowY: 'auto' }}>
                                <table className="table table-striped" style={{ tableLayout: 'fixed', width: '100%' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', cursor: 'pointer' }}>
                                            <th onClick={() => handleSort('name')}>
                                                Sat Name <span>{sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}</span>
                                            </th>
                                            <th onClick={() => handleSort('date')}>
                                                Launch Time <span>{sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}</span>
                                            </th>
                                            <th onClick={() => handleSort('outcome')}>
                                                Outcome <span>{sortConfig.key === 'outcome' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑↓'}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentLaunches.map(launch => (
                                            <tr key={launch.id} style={{ cursor: 'pointer' }} onClick={() => handleLaunchClick(launch.id)}>
                                                <td>
                                                    {launch.links?.patch?.missionPatchSmall ? (
                                                        <img
                                                            src={launch.links.patch.missionPatchSmall}
                                                            alt={`${launch.name} patch`}
                                                            style={{ width: '30px', height: '30px', marginRight: '3px', verticalAlign: 'middle' }}
                                                        />
                                                    ) : (
                                                        <span style={{ marginRight: '5px', fontSize: '12px', color: '#888' }}>
                                                            [No Patch]
                                                        </span>
                                                    )}
                                                    {launch.name}
                                                </td>
                                                <td>{launch.dateUtcRaw === "null" ? "TBD" : formatDate(launch.dateUtcRaw)}</td>
                                                <td>{launch.success === null
                                                    ? launch.dateUtcRaw === null ? "Not launched" : "Unknown"
                                                    : launch.success ? "Success" : "Failed"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ marginTop: '10px', marginLeft: '160px' }}>
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
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const strHours = String(hours).padStart(2, '0');
        const timeZone = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
            .formatToParts(date)
            .find(part => part.type === 'timeZoneName')?.value || '';
        return `${day}-${month}-${year} ${strHours}:${minutes} ${ampm} ${timeZone}`;
    }

    async function populateRocketLaunchesData(retries = 5, delay = 2000) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch('/rocketlaunches');
                if (response.ok) {
                    const data = await response.json();
                    setLaunches(data);
                    setFilteredLaunches(data);
                    return;
                }
            } catch (err) {
                console.error("API not ready yet, retrying...", err);
            }
            await new Promise(res => setTimeout(res, delay));
        }
        console.error("Failed to fetch rocket launches after retries");
    }
}

export default App;
