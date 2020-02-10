import React, { useState, useEffect } from 'react';
import { FoodDB, UserDB } from '../../globals/Utils.js';
import Restaurant from './Restaurant';
import SearchBar from '../Searchbar/Searchbar';
import Map from './Map';
import './Restaurants.scss';

const Restaurants = () => {
    const [restaurantsNearMe, setRestaurantsNearMe] = useState([]);
    const savedLocation = JSON.parse(UserDB.get.savedLocation());
    const [userLocation, setUserLocation] = useState([savedLocation.lat, savedLocation.lng]);

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
                    <Map center={userLocation} data={restaurantsNearMe}/>
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
