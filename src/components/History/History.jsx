import React, {useState, useEffect} from 'react';
import {UserDB} from '../../globals/Utils';
import {ReactComponent as ExpandMoreIcon} from '../../assets/expandmore.svg';
import {ReactComponent as ExpandLessIcon} from '../../assets/expandless.svg';
import './History.scss';

const HistoryItem = ({time, ...items}) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState("[]");

    useEffect(() => {
        let finalData = [];
        for(const item in items){
            finalData.push({id: item, quantity: items[item]});
            if(localStorage.getItem(item) === null){
                localStorage.setItem(item, JSON.stringify({
                    brand: "",
                    name: "",
                    "calories": null,
                    "calories from fat": null,
                    "total fat": null,
                    "trans fat": null,
                    cholesterol: null,
                    sodium: null,
                    "total carbs": null,
                    fiber: null,
                    sugars: null,
                    protein: null
                }));
                fetch('https://www.nutritionix.com/nixapi/items/' + item).then(res => res.json()).then(res => {
                    localStorage.setItem(item, JSON.stringify({
                        brand: res.brand_name,
                        name: res.item_name,
                        "calories": res.calories,
                        "calories from fat": res.calories_from_fat,
                        "total fat": res.total_fat,
                        "trans fat": res.trans_fat,
                        cholesterol: res.cholesterol,
                        sodium: res.sodium,
                        "total carbs": res.totalCarb,
                        fiber: res.dietary_fiber,
                        sugars: res.sugars,
                        protein: res.protein
                    }));
                }).catch(err => {
                    console.log(err);
                })
            }
        }
        setData(JSON.stringify(finalData));
    }, [items]);

    return (
        <div className="history-item" onClick={() => {setOpen(!open)}}>
            <div className="expand-icon">
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <p>{JSON.parse(data).length} item{JSON.parse(data).length > 1 ? 's' : ''}</p> @ <span>{(new Date(time)).toDateString()}</span>

            <div className={`details ${open ? "open" : ""}`}>
                {JSON.parse(data).map(e => <FoodItem key={e.id} open={open} id={e.id} amt={e.quantity}/>)}
            </div>
        </div>
    );
}
const FoodItem = ({id, amt, open}) => {
    const [{name, brand, ...stats}, setData] = useState(JSON.parse(localStorage.getItem(id)));
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem(id)));
    }, [open, id]);
    return (
        <div className="history-food">
            <h4>{name} x{amt}</h4>
            <div>
                {Object.keys(stats).reduce((acc, val) => {
                    if(stats[val] !== null){
                        return ([ ...acc, (
                            <div className="fact" key={val}>
                                <div className="category">{val}</div>
                                <div className="value">{stats[val]}</div>
                            </div>
                            )]
                        );
                    }
                    return acc;
                }, [])}
            </div>
        </div>
    );
}

const History = () => {
    const [userHistory, setUserHistory] = useState(UserDB.get.user('preferences'));
    useEffect(() => {
        if(userHistory === null){
            setUserHistory({history: [], total: 0});
        }
    }, [userHistory]);
    return (
        <div className="history-wrapper">
            <h3>History</h3>
            {userHistory.history.map(entry => <HistoryItem key={entry.time} {...entry}/> )}
        </div>
    )
}

export default History;
