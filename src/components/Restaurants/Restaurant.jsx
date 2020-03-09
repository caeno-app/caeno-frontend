import React, { useState } from 'react';
import RestaurantMenu from './RestaurantMenu';
import './Restaurants.scss';

const Restaurant = ({name, brand_id, address, densevector}) => {
    const [retrievedRestaurantData, setRetrievedRestaurantData] = useState(false);
    const [expand, setExpand] = useState(false);

    const getAndDisplayRestaurantData = () => {
        setExpand(!expand);
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
