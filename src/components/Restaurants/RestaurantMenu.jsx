import React, {useState, useEffect} from 'react';
import {FoodDB, updateUserVector, UserDB} from '../../globals/Utils.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import {MenuItem, GroupItem} from './MenuItems';
import './RestaurantMenu.scss';

const DisplayMeal = ({meal, ItemDict}) => {
    const parseMeals = () => {
        let meals = [];
        for(const item in meal){
            meals.push(
                <div key={item} className="">
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
                if(vector === null){
                    fetch('https://api.caeno.app/api/elrestvector?brandid=' + id).then(res => res.json()).then(res => {
                        let total = 0;
                        for(const item in meal){ total += Number(meal[item]) }
                        let newUserVector = UserDB.get.user('preferences').vector,
                            newUserTotal = UserDB.get.user('preferences').total,
                            newUserHistory = UserDB.get.user('preferences').history;
                        for(let i = 0; i < total; i++){
                            newUserTotal += 1;
                            newUserVector = updateUserVector(newUserVector, newUserTotal, res.densevector);
                        }
                        newUserHistory.push({...meal, time: (new Date()).toISOString()});
                        UserDB.set.user(newUserVector, newUserTotal, newUserHistory, () => {
                            Swal.fire('Added!', 'Your meal has been recorded.', 'success');
                            setOpen(false);
                        });
                    });
                    return;
                }
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
                    menu.map((menuItem, i) => {
                        if(!menuItem.hasOwnProperty('group_id')){
                            return <MenuItem {...menuItem} key={menuItem._id} meal={meal} ItemDict={itemDict} setItemDict={setItemDict} setMeal={setMeal}/>
                        }
                        return <GroupItem {...menuItem} key={menuItem.group_id} meal={meal} ItemDict={itemDict} setItemDict={setItemDict} setMeal={setMeal}/>
                    })
                )}
                </div>
                <div className="user-options">
                    <button disabled={meal === null || Object.keys(meal).length === 0} onClick={updateUserMeals}>add meal</button>
                </div>
            </div>
        </div>  
    );
}

export default RestaurantMenu;