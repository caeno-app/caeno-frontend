import React, { useState, useEffect, useContext } from 'react';
import { FoodDB, UserDB } from '../../globals/Utils.js';
import Restaurant from './Restaurant';
import SearchBar from '../Searchbar/Searchbar';
import Map from './Map';
import LocationContext from '../../context/LocationContext';
import './Restaurants.scss';

const ErrorMap = ({promptLocation}) => {
    return (
        <div className="error">
            Enable Location to view restaurants
            <br />
            <br />
            <button className="enable-location" onClick={promptLocation}>
                Enable Location
            </button>
        </div>
    );
}

const Restaurants = () => {
    const userLocation = useContext(LocationContext);
    const [center, setCenter] = useState([userLocation.lat, userLocation.lng]);
    const [restaurantsNearMe, setRestaurantsNearMe] = useState([]);

    useEffect( () => {
        if(userLocation.accuracy <= 0) return;

        (async () => {
            let data = await FoodDB.get.location(userLocation.lat, userLocation.lng, UserDB.get.user('preferences'));
            setRestaurantsNearMe(data);
        })();

    }, [userLocation]);

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
                    {userLocation.accuracy <= 0 
                        ? <ErrorMap promptLocation={userLocation.promptLocation}/>
                        : <Map center={center} setCenter={setCenter} data={restaurantsNearMe}/>}
                </div>
                <h3>Restaurants Near You</h3>
                {restaurantsNearMe.reduce((restaurantPinArray, restaurantData) => {
                    // if(restaurantData.lat === "undefined" || restaurantData.lng === "undefined") return restaurantPinArray;
                    restaurantPinArray.push(<Restaurant key={restaurantData._id} {...restaurantData} />);
                    return restaurantPinArray;
                }, [])}
            </main>
        </div>
    )
}

export default Restaurants;
