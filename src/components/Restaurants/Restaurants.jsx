import React, { useState, useEffect } from 'react';
import { FoodDB } from '../../globals/Utils.js';
import './Restaurant.scss';

const Restaurants = () => {
    const [restaurantsNearMe, setRestaurantsNearMe] = useState([]);

    useEffect( () => {
        (async () => {
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

const Restaurant = ({name, brand_id, address}) => {
    const [restaurantData, setRestaurantData] = useState({});
    const [retrievedRestaurantData, setRetrievedRestaurantData] = useState(false);
    const [expand, setExpand] = useState(false);

    const getAndDisplayRestaurantData = () => {
        setExpand(!expand);
        if(retrievedRestaurantData || brand_id === null) return;
        setRetrievedRestaurantData(true);
        fetch(`https://www.nutritionix.com/nixapi/brands/${brand_id}`)
        .then(resp => {
            return resp.json();
        }).then(resp => {
            setRestaurantData(resp);
        });
    }
    return (
        <div className="restaurant-wrapper" onClick={getAndDisplayRestaurantData}>
            {name}
            <br />
            {address}
            <div className={`menu-wrapper${expand ? ' expanded' : ''}`}>
                <h3>Popular Items</h3>
                {
                    restaurantData.hasOwnProperty('popularTrackItems') 
                    && restaurantData.popularTrackItems.map((menuItem, i) => (
                        <RestaurantMenuItem key={menuItem['nix_item_id']} {...menuItem} index={i}/>
                    ))
                }
            </div>
        </div>
    );
}


const RestaurantMenuItem = ({food_name, nf_calories, index}) => {  
    return (
        <div className="menu-item">
            {food_name}
            <br />
            <span>{nf_calories} calories</span>
        </div>
    );
}