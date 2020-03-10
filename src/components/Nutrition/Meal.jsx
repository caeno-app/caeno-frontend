import React, { useState } from 'react';
import RestaurantMenu from '../Restaurants/RestaurantMenu';
import '../Restaurants/Restaurants.scss';

const Meal = ({brand_id, calories, item_name, restaurant}) => {
    const [expand, setExpand] = useState(false);
    const getAndDisplayRestaurantData = () => {
        setExpand(true);
    }
    return (
        <div className="restaurant-wrapper" onClick={getAndDisplayRestaurantData}>
            {item_name}
            <br />
            <span>{calories} Cal. {restaurant}</span>
            <RestaurantMenu open={expand} setOpen={setExpand} id={brand_id} vector={null}/>
        </div>
    );
}
export default Meal;
