import React, { useState, useEffect } from 'react';
import './Restaurants.scss';

const RestaurantMenuItem = ({food_name, nf_calories, index}) => {  
    return (
        <div className="menu-item">
            {food_name}
            <br />
            <span>{nf_calories} calories</span>
        </div>
    );
}

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
            <span>{address}</span>
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
export default Restaurant;
