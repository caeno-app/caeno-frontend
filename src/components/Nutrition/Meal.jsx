import React, { useState } from 'react';
import RestaurantMenu from '../Restaurants/RestaurantMenu';
import '../Restaurants/Restaurants.scss';

const Meal = ({brand_id, calories, item_name, restaurant}) => {
    const densevector = (new Array(11)).fill(0);
    const [expand, setExpand] = useState(false);
    // get desnse vector TODO
    const getAndDisplayRestaurantData = () => {
        setExpand(true);
    }
    return (
        <div className="restaurant-wrapper" onClick={getAndDisplayRestaurantData}>
            {item_name}
            <br />
            <span>{calories} Cal. {restaurant}</span>
            <RestaurantMenu open={expand} setOpen={setExpand} id={brand_id} vector={densevector}/>
        </div>
    );
}
export default Meal;
