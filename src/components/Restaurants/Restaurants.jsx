import React, { useState, useEffect, useContext } from 'react';
import { FoodDB, UserDB } from '../../globals/Utils.js';
import Restaurant from './Restaurant';
import SearchBar from '../Searchbar/Searchbar';
import Map from './Map';
import RestaurantMenu from './RestaurantMenu';
import LocationContext from '../../context/LocationContext';
import './Restaurants.scss';

const ErrorMap = ({promptLocation}) => {
    return (
        <div className="error">
            Enable Location to view restaurants
            <br />
            <br />
            <button className="enable-location" onClick={promptLocation}>
                Enable Location
            </button>
        </div>
    );
}
const Result = ({item, matches}) => {
    const restaurantPopup = (e) => {
        e.preventDefault();
        setExpand(true);
    }
    const [expand, setExpand] = useState(false);
    const [name, setName] = useState(item.name);
    const [address, setAddress] = useState(item.address);

    useEffect(() => {
        matches.forEach((e) => {
            let finalName;
            if(e.key === "address"){
                finalName = item.address;
                for(let i = e.indices.length - 1; i >= 0; i--){
                    finalName = finalName.slice(0, e.indices[i][0]) + "<span>" + finalName.slice(e.indices[i][0],  e.indices[i][1] + 1) + "</span>" +  finalName.slice(e.indices[i][1] + 1);
                }
                setAddress(finalName);
            }else{
                finalName = item.name;
                for(let i = e.indices.length - 1; i >= 0; i--){
                    finalName = finalName.slice(0, e.indices[i][0]) + "<span>" + finalName.slice(e.indices[i][0],  e.indices[i][1] + 1) + "</span>" +  finalName.slice(e.indices[i][1] + 1);
                }
                setName(finalName);
            }
        });
        
    }, [matches, item.name, item.address]);
    return (
        <div className="nutrition-result-wrapper" onClick={restaurantPopup}>
            <p className="item-name" dangerouslySetInnerHTML={{__html: name}}></p>
            <p dangerouslySetInnerHTML={{__html: address}}></p>
            <RestaurantMenu open={expand} setOpen={setExpand} id={item.brand_id} vector={item.densevector}/>
        </div>
    );
}

const Restaurants = () => {
    const userLocation = useContext(LocationContext);
    const [center, setCenter] = useState([userLocation.lat, userLocation.lng]);
    const [restaurantsNearMe, setRestaurantsNearMe] = useState([]);

    useEffect( () => {
        if(userLocation.accuracy <= 0) return;

        (async () => {
            let data = await FoodDB.get.location(userLocation.lat, userLocation.lng, UserDB.get.user('preferences'));
            setRestaurantsNearMe(data);
        })();

    }, [userLocation]);

    return (
        <div className="restaurants-wrapper">
            <header>
                <span>
                    Powered by Nutritionix
                </span>
                <h2>What would you like to eat?</h2>
                <SearchBar
                    placeholder="Search restaurants..."
                    data={restaurantsNearMe}
                    keys={[{name:"name", weight: 0.7}, {name:"address", weight: 0.3}]}
                    Result={Result}/>
            </header>
            <main>
                <div className="map">
                    {userLocation.accuracy <= 0 
                        ? <ErrorMap promptLocation={userLocation.promptLocation}/>
                        : <Map center={center} setCenter={setCenter} data={restaurantsNearMe}/>}
                </div>
                <h3>Restaurants Near You</h3>
                {restaurantsNearMe.reduce((restaurantPinArray, restaurantData) => {
                    // if(restaurantData.lat === "undefined" || restaurantData.lng === "undefined") return restaurantPinArray;
                    restaurantPinArray.push(<Restaurant key={restaurantData._id} {...restaurantData} />);
                    return restaurantPinArray;
                }, [])}
            </main>
        </div>
    )
}

export default Restaurants;
