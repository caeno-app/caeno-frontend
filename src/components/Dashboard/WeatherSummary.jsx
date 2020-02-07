import React, {useState, useEffect} from 'react';
import {UserDB} from '../../globals/Utils';
import './WeatherSummary.scss';

const WeatherSummary = () => {
    const [weather, setWeather] = useState(null);
    /**
     * Weather data should only be refreshed if the weather data has expired
     * or does not exist.
     * @TODO should be updated to include position changes as well
     */
    useEffect(() => {
        let weatherData = UserDB.get.weather();
        if(weatherData !== null) return setWeather(JSON.parse(weatherData));
        let position = JSON.parse(UserDB.get.savedLocation());
        if(position === null) return;
        let weatherAPI = `https://api.weather.gov/points/${position.lat},${position.lng}`;
        fetch(weatherAPI).then(res => res.json()).then(res => {
            if(res.properties.forecast){
                fetch(res.properties.forecast).then(res => res.json()).then(res => {
                    UserDB.set.weather(res.properties);
                    setWeather(res.properties);
                });
            }
        });
    }, [setWeather]);
    
    return weather === null ? "" : (
        <div className="weather-summary-wrapper">
            <span>Weather</span>
            <WeatherCard data={weather.periods[0]} />
        </div>
    );
}
const WeatherCard = ({data}) => {
    const tempColor = () => {
        if(data.temperature < 33) return '#009bd4';
        if(data.temperature < 63) return '#855ee0';
        if(data.temperature < 83) return '#ff9900';
        return '#ff3c00';
    }
    return (
        <div className="card">
            <div className="image" style={{backgroundImage: `url("${data.icon}")`}}></div>
            <div className="content">
                {data.name}
                <br />
                <span style={{color:  tempColor()}}>
                    {data.temperature} °{data.temperatureUnit}
                </span>
            </div>
        </div>
    );
}
export default WeatherSummary;
