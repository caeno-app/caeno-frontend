import React, { useState } from 'react';
import RestaurantMenu from '../Restaurants/RestaurantMenu';
import '../Restaurants/Restaurants.scss';

const Meal = ({brand_id, calories, item_name, items, group_id, restaurant}) => {
    const [expand, setExpand] = useState(false);
    const getAndDisplayRestaurantData = () => {
        setExpand(true);
    }
    return (
        <div className="restaurant-wrapper" onClick={getAndDisplayRestaurantData}>
            {item_name ?? group_id}
            <br />
            {item_name === undefined ? '' : (<span>{calories} Cal. {restaurant}</span>)}
            <RestaurantMenu name={restaurant ?? items[0].restaurant} open={expand} setOpen={setExpand} id={brand_id ?? items[0].brand_id} vector={null}/>
        </div>
    );
}
export default Meal;
