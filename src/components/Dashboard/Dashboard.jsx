import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import './Dashboard.scss';


const Dashboard = _ => {
    const data = {
        today: new Date(),
        fname: 'Ryan'
    }

    return (
        <div className="dashboard-wrapper">
            <div className="greeting-card">
                <span>
                    {data.today.toString().substring(0, 16)}
                </span>
                <h2>
                    Hello {data.fname},
                    <br />
                    {`Good ${data.today.getHours() < 12 ? 'Morning' : 'Afternoon'}!`}
                </h2>
                <SearchBar />
            </div>
        </div>
    )
}

export default Dashboard;
