import React, {useState, useEffect} from 'react';
import {UserDB} from '../../globals/Utils';
import './Dashboard.scss';
import WeatherSummary from './WeatherSummary';
import FoodItemHexbin from '../../globals/graphs/FoodItemHexbin';
import FoodLineChart from '../../globals/graphs/FoodLineChart';
import 'react-vis/dist/style.css';

const Dashboard = () => {
    const [today] = useState(new Date());
    const convertHex = (data) => {
        if(data.history === undefined) return [];
        let parsed = [];
        data.history.forEach(entry => {
            let {time, ...meals} = entry;
            Object.keys(meals).forEach(meal => {
                parsed.push({
                    ...JSON.parse(localStorage.getItem(meal)),
                    time: time,
                    id: meal,
                });
            })
        })
        return parsed;
    }
    const [hexbinData, setHexbinData] = useState(convertHex(UserDB.get.user('preferences')));
    const getFirstName = () => {
        let fname = UserDB.get.user('name').split(' ')[0]
        return fname.charAt(0).toUpperCase() + fname.slice(1);
    }

    useEffect(() => {
        setTimeout(() => {
            setHexbinData(convertHex(UserDB.get.user('preferences')))
        }, 1000);
    }, []);

    return (
        <div className="dashboard-wrapper">
            <div className="greeting-card">
                <span>
                    {today.toString().substring(0, 16)}
                </span>
                <h2>
                    Hello {getFirstName()},
                    <br />
                    {`Good ${today.getHours() < 12 ? 'Morning' : 'Afternoon'}!`}
                </h2>
            </div>
            <div className="cards-wrapper">
                <WeatherSummary />
                <FoodItemHexbin DATA={hexbinData}/>
                <FoodLineChart DATA={hexbinData}/>
            </div>
        </div>
    )
}

export default Dashboard;
