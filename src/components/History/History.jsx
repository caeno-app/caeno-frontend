import React, {useState, useEffect} from 'react';
import {UserDB} from '../../globals/Utils';
import './History.scss';

const HistoryItem = ({time, ...items}) => {
    const [open, setOpen] = useState(false);
    const [datat, setDatat] = useState("[]");

    useEffect(() => {
        let finalData = [];
        for(const item in items){
            finalData.push({id: item, quantity: items[item]});
            if(localStorage.getItem(item) === null){
                localStorage.setItem(item, JSON.stringify({
                    cal: null,
                    calFromFat: null,
                    totalFat: null,
                    transFat: null,
                    cholesterol: null,
                    sodium: null,
                    totalCarb: null,
                    fiber: null,
                    sugars: null,
                    protein: null
                }));
                fetch('https://www.nutritionix.com/nixapi/items/' + item).then(res => res.json()).then(res => {
                    localStorage.setItem(item, JSON.stringify({
                        cal: res.calories,
                        calFromFat: res.calories_from_fat,
                        totalFat: res.total_fat,
                        transFat: res.trans_fat,
                        cholesterol: res.cholesterol,
                        sodium: res.sodium,
                        totalCarb: res.totalCarb,
                        fiber: res.dietary_fiber,
                        sugars: res.sugars,
                        protein: res.protein
                    }));
                }).catch(err => {
                    console.log(err);
                })
            }
        }
        setDatat(JSON.stringify(finalData));
    }, [items]);

    return (
        <div className="history-item" onClick={() => {setOpen(!open)}}>
            {JSON.parse(datat).length} item{JSON.parse(datat).length > 1 ? 's' : ''} @ {(new Date(time)).toDateString()}
            <div className={`details ${open ? "open" : ""}`}>
                
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
