import React, { useState } from 'react';
import { Map as LMap, TileLayer, CircleMarker, Popup } from 'react-leaflet';
// import Restaurant from './Restaurant';
import 'leaflet/dist/leaflet.css';
import './Map.scss';

const RestaurantPin = ({lat, lng, name, address}) => {
    return (
        <CircleMarker
            center={[lat, lng]}
            radius={5}
            fill={true}
            color={'#ffff00'}
            fillColor={'#ffff00'}
            fillOpacity={'1'}
            // onClick={() => { setCenter.bind(null, popuploc) }}
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

const Map = ({data, center}) => {
    const [zoom] = useState(13);
    return (
        <LMap center={center} zoom={zoom} zoomControl={false} attributionControl={false} dragging={false} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <CircleMarker
                center={center}
                radius={5}
                fill={true}
                color={'#00ffff'}
                fillColor={'#00ffff'}
                fillOpacity={'1'}
                // onClick={() => { setCenter.bind(null, popuploc) }}
            >
            </CircleMarker>
            {data.map( e => <RestaurantPin key={e.id} {...e}/> )}
        </LMap>
    )
}

export default Map;
