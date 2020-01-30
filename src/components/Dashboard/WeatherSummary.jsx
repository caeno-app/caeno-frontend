import React, {useState, useEffect} from 'react';
import {UserDB} from '../../globals/Utils';
import './WeatherSummary.scss';

const WeatherSummary = () => {
    const [position, setPosition] = useState(null);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        // let weatherData = UserDB.get.weather();
        // if(weatherData !== null) return setWeather(weatherData);

        let geo = navigator.geolocation;
        if (geo) {
            geo.getCurrentPosition( 
                pos => {
                    alert("Got user position: ", JSON.stringify(pos));
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                }, err => {
                    console.log(err);
                },
                {timeout: 4000}
            );
        }
        // console.log(geo, weatherData === null);
    }, [setPosition, setWeather]);

    useEffect(() => {
        // console.log("positoin")
        if(position === null) return;
        // console.log("positoin not null")
        let weatherAPI = `https://api.weather.gov/points/${position[0]},${position[1]}`;
        fetch(weatherAPI).then(res => res.json()).then(res => {
            console.log(res);
            if(res.properties.forecast){
                fetch(res.properties.forecast).then(res => res.json()).then(res => {
                    alert(JSON.stringify(res.properties[0]));
                    UserDB.set.weather(res.properties[0]);
                    setWeather(res.properties[0]);
                });
            }
        });
    }, [position]);

    return (
        <div className="weather-summary-wrapper">
            {weather !== null &&
                <div className="card">
                    {JSON.stringify(weather)}
                </div>
            }
        </div>
    );
}

export default WeatherSummary;
