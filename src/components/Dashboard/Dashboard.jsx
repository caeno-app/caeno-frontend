import React, {useState} from 'react';
import SearchBar from '../Searchbar/Searchbar';
import {UserDB} from '../../globals/Utils';
import './Dashboard.scss';


const Dashboard = ({name}) => {
    const [today] = useState(new Date());
    const getFirstName = () => {
        return UserDB.get.user().name.split(' ')[0];
    }

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
                <SearchBar />
            </div>
        </div>
    )
}

export default Dashboard;
