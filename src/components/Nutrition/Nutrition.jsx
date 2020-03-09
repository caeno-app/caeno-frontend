import React, {useState, useEffect, useContext} from 'react';
import SearchBar from '../Searchbar/Searchbar';
import LocationContext from '../../context/LocationContext';
import {FoodDB} from '../../globals/Utils';
import RestaurantMenu from '../Restaurants/RestaurantMenu';
import Meal from './Meal';
import './Nutrition.scss';

const Result = ({item, matches}) => {
    let densevector =(new Array(11)).fill(0);
    const restaurantPopup = (e) => {
        e.preventDefault();
        setExpand(true);
        //should get vector but will pass in 0 vector for now TODO
    }
    const [expand, setExpand] = useState(false);
    const [name, setName] = useState(item.item_name);
    const [restaurant, setRestaurant] = useState(item.restaurant);
    useEffect(() => {
        matches.forEach((e) => {
            let finalName;
            if(e.key === "restaurant"){
                finalName = item.restaurant;
                for(let i = e.indices.length - 1; i >= 0; i--){
                    finalName = finalName.slice(0, e.indices[i][0]) + "<span>" + finalName.slice(e.indices[i][0],  e.indices[i][1] + 1) + "</span>" +  finalName.slice(e.indices[i][1] + 1);
                }
                setRestaurant(finalName);
            }else{
                finalName = item.item_name;
                for(let i = e.indices.length - 1; i >= 0; i--){
                    finalName = finalName.slice(0, e.indices[i][0]) + "<span>" + finalName.slice(e.indices[i][0],  e.indices[i][1] + 1) + "</span>" +  finalName.slice(e.indices[i][1] + 1);
                }
                setName(finalName);
            }
        });
        
    }, [matches, item.item_name, item.restaurant]);
    return (
        <div className="nutrition-result-wrapper" onClick={restaurantPopup}>
            <p className="item-name" dangerouslySetInnerHTML={{__html: name}}></p>
            {item.calories} Cal. <p dangerouslySetInnerHTML={{__html: restaurant}}></p>
            <RestaurantMenu open={expand} setOpen={setExpand} id={item.brand_id} vector={densevector}/>
        </div>
    );
}


const Nutrition = () => {
    const userLocation = useContext(LocationContext);
    const [items, setItems] = useState([]);

    useEffect( () => {
        if(userLocation.accuracy <= 0) return;

        (async () => {
            let data = await FoodDB.get.items(userLocation.lat, userLocation.lng);
            data = data.map(item => ({
                "id": item[0],
                ...item[1]
            }));
            setItems(data);
        })();

    }, [userLocation]);
    return (
        <div className="nutrition-wrapper">
            <header>
                <span>
                    Powered by Nutritionix
                </span>
                <h2>What would you like to eat?</h2>
                <SearchBar
                    placeholder="Search food items..."
                    data={items}
                    keys={[{name:"restaurant", weight: 0.7}, {name:"item_name", weight: 0.3}]}
                    Result={Result}/>
            </header>
            <main>
                <h3>Recommended Meals</h3>
                {items.map(e => <Meal key={e.id} {...e} />)}
            </main>
        </div>
    )
}

export default Nutrition;
