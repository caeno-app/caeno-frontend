import React, { useState, useEffect } from 'react';
import { FoodDB } from '../../globals/Utils.js';
import Restaurant from './Restaurant';
import SearchBar from '../Searchbar/Searchbar';
import './Restaurants.scss';

const Restaurants = () => {
    const [restaurantsNearMe, setRestaurantsNearMe] = useState([]);

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
                <h3>Restaurants Near You</h3>
                {restaurantsNearMe.map(restaurantData => {
                    return <Restaurant key={restaurantData.id} {...restaurantData} />
                })}
            </main>
        </div>
    )
}
export default Restaurants;
