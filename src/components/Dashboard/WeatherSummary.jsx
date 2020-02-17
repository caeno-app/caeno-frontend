import React, {useState, useEffect, useContext} from 'react';
import {UserDB} from '../../globals/Utils';
import LocationContext from '../../context/LocationContext';
import './WeatherSummary.scss';

const WeatherSummary = () => {
    const [weather, setWeather] = useState(null);
    const position = useContext(LocationContext);
    
    /**
     * Weather data should only be refreshed if the weather data has expired
     * or does not exist.
     * @TODO should be updated to include position changes as well
     */
    useEffect(() => {
        let weatherData = UserDB.get.weather();
        if(weatherData !== null) return setWeather(JSON.parse(weatherData));
        if(position === null) return;
        let weatherAPI = `https://api.weather.gov/points/${position.lat},${position.lng}`;
        // fetch(weatherAPI).then(res => res.json()).then(res => {
        //     if(res.properties.forecast){
        //         fetch(res.properties.forecast).then(res => res.json()).then(res => {
        //             UserDB.set.weather(res.properties);
        //             setWeather(res.properties);
        //         });
        //     }
        // });
    }, [setWeather, position]);
    
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
            <div className="content">
                <h3 style={{color:  tempColor()}}>
                    {data.temperature}°{/*data.temperatureUnit*/}
                </h3>
                <span className="">{data.name}</span>
                <br />
                <p>{data.detailedForecast}</p>
            </div>
        </div>
    );
}
export default WeatherSummary;
