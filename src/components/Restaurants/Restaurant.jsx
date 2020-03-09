import React, { useState } from 'react';
import RestaurantMenu from './RestaurantMenu';
import './Restaurants.scss';

const Restaurant = ({name, brand_id, address, densevector}) => {
    // const [restaurantData, setRestaurantData] = useState({});
    const [retrievedRestaurantData, setRetrievedRestaurantData] = useState(false);
    const [expand, setExpand] = useState(false);

    const getAndDisplayRestaurantData = () => {
        setExpand(!expand);

        if(retrievedRestaurantData || brand_id === null) return;

        setRetrievedRestaurantData(true);
    
        // fetch(`https://www.nutritionix.com/nixapi/brands/${brand_id}`)
        // .then(resp => {
        //     return resp.json();
        // }).then(resp => {
        //     setRestaurantData(resp);
        // });
    }
    return (
        <div className="restaurant-wrapper" onClick={getAndDisplayRestaurantData}>
            {name}
            <br />
            <span>{address}</span>
            <RestaurantMenu open={expand} setOpen={setExpand} id={brand_id} vector={densevector}/>
        </div>
    );
}
export default Restaurant;
