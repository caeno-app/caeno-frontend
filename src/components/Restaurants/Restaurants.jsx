import React, { useState, useEffect } from 'react';
import { FoodDB, UserDB } from '../../globals/Utils.js';
import Restaurant from './Restaurant';
import SearchBar from '../Searchbar/Searchbar';
import Map from './Map';
import './Restaurants.scss';

const ErrorMap = ({setLocation}) => {
    const renewLocation = () => {
        // console.log("Renewing Location permissions");
        UserDB.get.location((coords) => {
            setLocation([coords.lat, coords.lng]);
        });
    }
    return (
        <div className="error">
            Enable Location to view restaurants
            <br />
            <br />
            <button className="enable-location" onClick={renewLocation}>
                Enable Location
            </button>
        </div>
    );
}

const Restaurants = () => {
    const [restaurantsNearMe, setRestaurantsNearMe] = useState([]);
    const [userLocation, setUserLocation] = useState(JSON.parse(UserDB.get.savedLocation()));

    useEffect( () => {
        (async () => {
            let data = await FoodDB.get.location(30, 32);
            setRestaurantsNearMe(data.locations);
        })();
    }, []);
    return (
        <div className="restaurants-wrapper">
            <header>
                <span>
                    Powered by Nutritionix
                </span>
                <h2>What would you like to eat?</h2>
                <SearchBar placeholder="Search restaurants..."/>
            </header>
            <main>
                <div className="map">
                    {userLocation === null 
                        ? <ErrorMap setLocation={setUserLocation}/>
                        : <Map center={[userLocation.lat, userLocation.lng]} data={restaurantsNearMe}/>}
                </div>
                <h3>Restaurants Near You</h3>
                {restaurantsNearMe.map(restaurantData => {
                    return <Restaurant key={restaurantData.id} {...restaurantData} />
                })}
            </main>
        </div>
    )
}

export default Restaurants;
