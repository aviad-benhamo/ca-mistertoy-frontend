import { AdvancedMarker, APIProvider, InfoWindow, Map, useAdvancedMarkerRef } from "@vis.gl/react-google-maps"
import { useState } from "react"

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY

export function About() {
    const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 })
    const [activeBranch, setActiveBranch] = useState(null)

    const branches = [
        { name: 'Tel Aviv', location: { lat: 32.0853, lng: 34.7818 } },
        { name: 'Jerusalem', location: { lat: 31.7683, lng: 35.2137 } },
        { name: 'Modi\'in', location: { lat: 31.8903, lng: 35.0104 } }
    ]

    function onPanToBranch(branch) {
        setCenter(branch.location)
        setActiveBranch(branch)
    }

    return (
        <section className="about-page" style={{ textAlign: 'center', padding: '20px' }}>
            <h1>About Us</h1>
            <p>Welcome to MisterToy! We have branches in several locations.</p>

            <div className="branches-list" style={{ marginBottom: '20px' }}>
                <h3>Our Branches</h3>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    {branches.map(branch => (
                        <button
                            key={branch.name}
                            className="btn"
                            onClick={() => onPanToBranch(branch)}
                            style={{ padding: '8px 16px', cursor: 'pointer' }}
                        >
                            {branch.name}
                        </button>
                    ))}
                </div>
            </div>

            <section className="google-map-container" style={{ height: '500px', width: '100%' }}>
                <APIProvider apiKey={API_KEY}>
                    <Map
                        center={center}
                        defaultZoom={11}
                        mapId="DEMO_MAP_ID"
                        disableDefaultUI={false}
                        onCameraChanged={(ev) => setCenter(ev.detail.center)}
                        style={{ width: '100%', height: '100%' }}
                    >
                        {branches.map((branch, idx) => (
                            <BranchMarker
                                key={idx}
                                branch={branch}
                                isActive={activeBranch?.name === branch.name}
                                onPanToBranch={onPanToBranch}
                            />
                        ))}
                    </Map>
                </APIProvider>
            </section>
        </section>
    )
}

function BranchMarker({ branch, onPanToBranch }) {
    const [markerRef, marker] = useAdvancedMarkerRef()
    const [infoWindowOpen, setInfoWindowOpen] = useState(false)

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={branch.location}
                onClick={() => {
                    onPanToBranch(branch)
                    setInfoWindowOpen(true)
                }}
                title={branch.name}
            />
            {infoWindowOpen && (
                <InfoWindow
                    anchor={marker}
                    onCloseClick={() => setInfoWindowOpen(false)}
                >
                    <div style={{ color: 'black' }}>
                        <h3>{branch.name} Branch</h3>
                        <p>Come visit us!</p>
                    </div>
                </InfoWindow>
            )}
        </>
    )
}
