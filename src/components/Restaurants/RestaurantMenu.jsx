import React, {useState, useEffect} from 'react';
import {FoodDB, updateUserVector, UserDB} from '../../globals/Utils.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import './RestaurantMenu.scss';

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
const DisplayMeal = ({meal, ItemDict}) => {
    const parseMeals = () => {
        let meals = [];
        for(const item in meal){
            meals.push(
                <div className="">
                    <div className="">
                        {ItemDict[item]}
                    </div>
                    <div className="">
                        x{meal[item]}
                    </div>
                </div>
            );
        }
        return meals;
    }
    return (
        <div className="meal-wrapper">
            {parseMeals()}
        </div>
    );
}

const RestaurantMenu = ({open, setOpen, id, vector}) => {
    const [menu, setMenu] = useState(null);
    const [meal, setMeal] = useState(null);
    const [itemDict, setItemDict] = useState({});
    useEffect(() => {
        if(open && menu === null){
            (async () => {
                let data = await FoodDB.get.menu(id);
                setMenu(data);
            })();
        }
    }, [open, id, menu]);

    const updateUserMeals = (e) => {
        e.stopPropagation();
        withReactContent(Swal).fire({
            title: 'Add this meal?',
            html: <DisplayMeal meal={meal} ItemDict={itemDict}/>,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        }).then(res => {
            if (res.value) {
                let total = 0;
                for(const item in meal){ total += Number(meal[item]) }
                let newUserVector = UserDB.get.user('preferences').vector,
                    newUserTotal = UserDB.get.user('preferences').total,
                    newUserHistory = UserDB.get.user('preferences').history;
                for(let i = 0; i < total; i++){
                    newUserTotal += 1;
                    newUserVector = updateUserVector(newUserVector, newUserTotal, vector);
                }
                newUserHistory.push({...meal, time: (new Date()).toISOString()});
                UserDB.set.user(newUserVector, newUserTotal, newUserHistory, () => {
                    Swal.fire('Added!', 'Your meal has been recorded.', 'success');
                    setOpen(false);
                });
            }
        })
    }

    return (
        <div className={`menus-wrapper ${open ? 'open' : ''}`} onClick={() => {setOpen(false)}}>
            <div className="menu">
                <div className="items">
                <h1>Menu</h1>
                {menu !== null && (
                    menu.map((menuItem, i) => <MenuItem {...menuItem} key={i} meal={meal} ItemDict={itemDict} setItemDict={setItemDict} setMeal={setMeal}/>)
                )}
                </div>
                <div className="user-options">
                    <button onClick={updateUserMeals}>add meal</button>
                </div>
            </div>
        </div>  
    );
}

export default RestaurantMenu;