import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import $ from "jquery"; // Import jQuery
import {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import {getSystemTheme, Themes, useTheme} from "../../providers/Theme.tsx";

const homePosition: [number, number] = [44.55670943289804, -69.62324670490351]; // Latitude/Longitude

export default function FleetMap()
{
    const vehicles = [
        {id: "Vehicle 1", position: [44.44226469184543, -69.72588685008402], status: Status.Warning},
        {id: "Vehicle 2", position: [43.632780989183225, -70.34569189789903], status: Status.Inactive},
        {id: "Vehicle 3", position: [44.54385512007042, -69.68744468961644], status: Status.Waiting},
        {id: "Vehicle 4", position: [44.56217480275014, -69.63520286066105], status: Status.Danger},
        {id: "Vehicle 5", position: [39.852044836582344, -113.47759755135779], status: Status.Danger}
    ];

    const {theme} = useTheme();
    const [routes, setRoutes] = useState<{ [vehicleId: string]: [number, number][] }>({}); // Store route data

    // Function to calculate the bearing from `start` (vehicle) to `end` (home position)
    const calculateBearing = (start: [number, number], end: [number, number]) =>
    {
        const [lat1, lng1] = start;
        const [lat2, lng2] = end;

        const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
        const toDegrees = (radians: number) => (radians * 180) / Math.PI;

        const deltaLng = toRadians(lng2 - lng1);
        const y = Math.sin(deltaLng) * Math.cos(toRadians(lat2));
        const x =
            Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
            Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(deltaLng);

        let bearing = (toDegrees(Math.atan2(y, x)) + 360) % 360; // Normalize to 0–360 degrees

        // Adjust by -45 degrees to align with top-right marker orientation
        bearing = (bearing - 45 + 360) % 360;

        return bearing;
    };

    const fetchRoute = (vehicleId: string, start: [number, number], end: [number, number]) =>
    {
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;

        $.ajax({
            url: osrmUrl,
            type: "GET",
            success: (response) =>
            {
                const geometry = response.routes[0].geometry.coordinates.map(
                    ([lng, lat]: [number, number]) => [lat, lng] // Convert to [lat, lng]
                );

                setRoutes((prevRoutes) => ({
                    ...prevRoutes,
                    [vehicleId]: geometry
                }));
            },
            error: (_, textStatus, errorThrown) =>
            {
                console.error(`Error fetching route for ${vehicleId}: ${textStatus}`, errorThrown);
            }
        });
    };

    useEffect(() =>
    {
        vehicles.forEach((vehicle) =>
        {
            fetchRoute(vehicle.id, vehicle.position as [number, number], homePosition);
        });
    }, []);

    return (
        <MapContainer
            center={homePosition}
            zoom={14}
            style={{height: "100vh", width: "100%", backgroundColor: "var(--nextui-background)"}}
            zoomControl={false}
        >
            <TileLayer url={`https://{s}.basemaps.cartocdn.com/${(theme === Themes.SYSTEM ? getSystemTheme() : theme === Themes.DARK ? "dark" : "light")}_all/{z}/{x}/{y}{r}.png`}/>

            {/* Vehicle markers */}
            {vehicles.map((vehicle) =>
            {
                const bearing = calculateBearing(vehicle.position as [number, number], homePosition);

                const icon = new L.DivIcon({
                    className: "custom-icon",
                    html: `
                        <div style="
                            transform: rotate(${bearing}deg);
                            width: 30px;
                            height: 30px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="17" cy="17" r="16.5" fill="${getIconFill(vehicle.status)}" stroke="white"/>
                                <path d="M23.1821 12.0382C23.9807 11.9296 24.5287 12.828 24.1012 13.5451L16.9708 25.4933C16.5078 26.2681 15.3838 26.0719 15.2172 25.1874L14.2066 19.8351L17.8056 17.4106C17.9256 17.3234 18.0094 17.1917 18.0393 17.0432C18.0691 16.8947 18.0427 16.741 17.9655 16.6145C17.8884 16.488 17.7665 16.3986 17.6257 16.3651C17.4848 16.3316 17.3359 16.3566 17.2104 16.4348L13.6109 18.8584L9.40499 15.6581C8.70997 15.1289 9.0103 13.9747 9.87287 13.8561L23.1821 12.0382Z" fill="white"/>
                            </svg>
                        </div>
                    `, // Embed rotated icon
                    iconSize: [30, 30] // Control size
                });

                return (
                    <Marker
                        key={vehicle.id}
                        position={vehicle.position as [number, number]}
                        icon={icon}
                    >
                        <Popup>
                            <b>{vehicle.id}</b>
                            <br/>
                            Lat: {vehicle.position[0]} <br/>
                            Lng: {vehicle.position[1]} <br/>
                            Bearing: {bearing.toFixed(2)}°
                        </Popup>
                    </Marker>
                );
            })}

            {/* FleetOverviewPage marker */}
            <Marker key="home_marker" position={homePosition} icon={HomeIcon}>
                <Popup>
                    <b>Destination</b>
                </Popup>
            </Marker>

            {/* Draw routes */}
            {Object.entries(routes).map(([vehicleId, route], index) => (
                <Polyline
                    key={`route-${vehicleId}`}
                    positions={route}
                    pathOptions={{
                        color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
                        weight: 4,
                        opacity: 0.5
                    }}
                />
            ))}
        </MapContainer>
    );
}

enum Status
{
    Normal,
    Warning,
    Danger,
    Waiting,
    Inactive,
}

function getIconFill(status: Status)
{
    switch (status)
    {
        case Status.Warning:
            return "#dfa129";
        case Status.Danger:
            return "#eb4739";
        case Status.Waiting:
            return "#45a9fd";
        case Status.Inactive:
            return "#999999";
        default:
        case Status.Normal:
            return "#F35306";
    }
}


const HomeIcon: L.Icon = new L.Icon({
    iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_19_7)">
<circle cx="68" cy="68" r="17" fill="#F35306" stroke="white" stroke-width="2"/>
<path d="M72.5946 68.8396C71.3447 71.526 68.285 72.9113 68.155 72.9709C68.0553 73.0097 67.9446 73.0097 67.845 72.9709C67.72 72.9113 64.6553 71.526 63.4054 68.8396C62.6305 67.1663 63.0604 65.3638 63.9053 64.5892C64.2013 64.3373 64.5532 64.1587 64.9321 64.068C65.311 63.9774 65.7062 63.9773 66.0852 64.0678C66.8606 64.2428 67.5378 64.709 67.975 65.3687C68.413 64.7076 69.0923 64.2412 69.8698 64.0678C70.2488 63.9773 70.6439 63.9774 71.0229 64.068C71.4018 64.1587 71.7537 64.3373 72.0496 64.5892C72.9395 65.3638 73.3745 67.1663 72.5946 68.8396Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_19_7" x="0" y="0" width="136" height="136" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="25"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.952941 0 0 0 0 0.32549 0 0 0 0 0.0235294 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_19_7"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_19_7" result="shape"/>
</filter>
</defs>
</svg>


`)}`,
    iconSize: [136, 136] // Set Marker Size
});