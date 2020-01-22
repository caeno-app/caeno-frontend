import React, { useState, useEffect } from 'react';
import { FoodDB } from '../../globals/Utils.js';
import './Restaurant.scss';

const Restaurants = () => {
    const [restaurantsNearMe, setRestaurantsNearMe] = useState([]);

    useEffect( _ => {
        (async _ => {
            let data = await FoodDB.get.location(30, 32);
            setRestaurantsNearMe(data.locations);
        })();
    }, []);

    return (
        <div>
            {restaurantsNearMe.map(restaurantData => {
                return <Restaurant key={restaurantData.id} {...restaurantData} />
            })}
        </div>
    )
}
export default Restaurants;

const Restaurant = ({name, id}) => {
    const [restaurantData, setrestaurantData] = useState({});

    const getAndDisplayRestaurantData

    return (
        <div className="restaurant-wrapper">
            {name}
            <br />
        </div>
    );
}
