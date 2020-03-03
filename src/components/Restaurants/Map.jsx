import React, { useState } from 'react';
import { Map as LMap, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';

const RestaurantPin = ({lat_lon, name, address, setCenter}) => {
    return (
        <CircleMarker
            center={[lat_lon[0].lat, lat_lon[0].lon]}
            radius={5}
            fill={true}
            color={'#ffff00'}
            fillColor={'#ffff00'}
            fillOpacity={'1'}
            onClick={() => { setCenter([lat_lon[0].lat, lat_lon[0].lon]); }}
        >
            <Popup>
                <div className="map-popup">
                    {name}
                    <br />
                    <span>{address}</span>
                </div>
            </Popup>
        </CircleMarker>
    );
}

const Map = ({data, center, setCenter}) => {
    const [zoom] = useState(13);
    return (
        <LMap center={center} zoom={zoom} zoomControl={false} attributionControl={false} dragging={true} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <CircleMarker
                center={center}
                radius={5}
                fill={true}
                color={'#00ffff'}
                fillColor={'#00ffff'}
                fillOpacity={'1'}
            >
            </CircleMarker>
            {data.map(e => <RestaurantPin key={e.id} {...e} setCenter={setCenter}/> )}
        </LMap>
    )
}

export default Map;
