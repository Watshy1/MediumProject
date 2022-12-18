import { StoreContext } from '../Providers/Store';

import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {

    const { personalCoordinates, positions, token } = useContext(StoreContext);

    const icon = new L.Icon({
        iconUrl: "/user.png",
        iconSize: new L.Point(30, 30)
    });

    const navigate = useNavigate();
    const location = useLocation();

    const [mapStyle, setMapStyle] = useState("max");

    useEffect(() => {

        if (!token) {
            navigate('/');
        }

    }, [token]);

    useEffect(() => {

        if (location.pathname == "/map") {
            setMapStyle("max");
        } else {
            setMapStyle("min");
        }

    }, [location]);

    if (mapStyle === "max" && token) {
        return (
            <div style={{ height: "100vh", width: "100vw" }}>
                <MapContainer
                    center={[personalCoordinates.latitude, personalCoordinates.longitude]}
                    zoom={10}
                    scrollWheelZoom={true}
                    style={{ height: "100vh", width: "100vw" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {positions.data &&
                        Object.keys(positions.data).map((key, index) => {
                            return (
                                <Marker
                                    position={[
                                        positions.data[key].location.latitude,
                                        positions.data[key].location.longitude,
                                    ]}
                                    icon={icon}
                                    key={index}
                                >
                                    <Popup>{key}</Popup>
                                </Marker>
                            );
                        })}
                </MapContainer>
            </div>
        )
    } else if (mapStyle === "min" && token) {
        return (
            <MapContainer
                center={[personalCoordinates.latitude, personalCoordinates.longitude]}
                zoom={10}
                scrollWheelZoom={true}
                style={{ position: "fixed", bottom: "20px", right: "20px", height: "30vh", width: "30vw" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {positions.data &&
                    Object.keys(positions.data).map((key, index) => {
                        return (
                            <Marker
                                position={[
                                    positions.data[key].location.latitude,
                                    positions.data[key].location.longitude,
                                ]}
                                icon={icon}
                                key={index}
                            >
                                <Popup>{key}</Popup>
                            </Marker>
                        );
                    })}
            </MapContainer>
        )
    }

}