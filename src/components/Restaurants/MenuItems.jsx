import React, {useState, useEffect} from 'react';
import './RestaurantMenu.scss';

const GroupItem = ({group_id, items, meal, setMeal, ItemDict, setItemDict}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="grouped menu-item" onClick={(e) => {e.stopPropagation(); setOpen(!open)}}>
            {group_id}
            <div className={`grouped ${open ? 'open' : ''}`}>
                {items.map(menuItem => <MenuItem {...menuItem} key={menuItem._id} meal={meal} ItemDict={ItemDict} setItemDict={setItemDict} setMeal={setMeal}/> )}
            </div>
        </div>
    );
}

const MenuItem = ({item_name, calories, _id, meal, setMeal, ItemDict, setItemDict}) => {  
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);
    const add = (e) => {
        e.stopPropagation(); 
        setItemDict()
        setQuantity(quantity + 1);
        setItemDict({...ItemDict, [_id]: item_name});
    }
    const remove = (e) => {
        e.stopPropagation(); 
        setQuantity(quantity === 0 ? 0 : quantity - 1);
    }
    useEffect(() => {
        if(meal?.[_id] === quantity) return;
        if(quantity === 0){
            if(meal?.[_id] === undefined) return;
            let newMeal = meal;
            delete newMeal[_id];
            setMeal({...newMeal});
        }else{
            setMeal({...meal, [_id]: quantity});
        }
    }, [quantity, _id, setMeal, meal]);
    return (
        <div className="menu-item" onClick={(e) => {e.stopPropagation(); setOpen(!open)}}>
            {item_name}
            <br />
            <span>{calories} calories</span>
            <div className={`quantity ${open ? 'open' : ''}`}>
                <p>Qty. {quantity}</p>
                <button onClick={add}>add</button>
                <button onClick={remove}>remove</button>
            </div>
        </div>
    );
}

export {
    MenuItem,
    GroupItem
};