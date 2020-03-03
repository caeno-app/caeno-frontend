import React, {useState, useEffect} from 'react';
import {FoodDB} from '../../globals/Utils.js';
import './RestaurantMenu.scss';

const MenuItem = ({item_name, calories, _id, meal, setMeal}) => {  
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);
    const add = (e) => {
        e.stopPropagation(); 
        setQuantity(quantity + 1);
    }
    const remove = (e) => {
        e.stopPropagation(); 
        setQuantity(quantity === 0 ? 0 : quantity - 1);
    }
    useEffect(() => {
        if(meal?.[_id] === quantity){
            return;
        }
        if(quantity === 0){
            if(meal?.[_id] === undefined) return;
            let newMeal = meal;
            delete newMeal[_id];
            setMeal(newMeal);
        }else{
            setMeal({...meal, [_id]: quantity});
        }
    }, [quantity, _id, setMeal, meal]);
    return (
        <div className="menu-item" onClick={() => {setOpen(!open)}}>
            {item_name}
            <br />
            <span>{calories} calories</span>
            <div className="quantity">
                <p>Qty. {quantity}</p>
                <button onClick={add}>add</button>
                <button onClick={remove}>remove</button>
            </div>
        </div>
    );
}

const RestaurantMenu = ({open, setOpen, id}) => {
    const [menu, setMenu] = useState(null);
    const [meal, setMeal] = useState(null);
    useEffect(() => {
        if(open && menu === null){
            (async () => {
                let data = await FoodDB.get.menu(id);
                setMenu(data);
            })();
        }
    }, [open, id, menu]);

    return (
        <div className={`menus-wrapper ${open ? 'open' : ''}`} onClick={() => {setOpen(false)}}>
            <div className="menu">
                <h1>Menu</h1>
                {menu !== null && (
                    menu.map((menuItem, i) => <MenuItem {...menuItem} key={i} meal={meal} setMeal={setMeal}/>)
                )}
            </div>
        </div>  
    );
}

export default RestaurantMenu;