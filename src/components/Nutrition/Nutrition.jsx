import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import './Nutrition.scss';

const Nutrition = () => {
    return (
        <div className="nutrition-wrapper">
            <header>
                <span>
                    Powered by Nutritionix
                </span>
                <h2>What ingredients sound good?</h2>
                <SearchBar placeholder="Search ingredients..."/>
            </header>
            <main>
                {/* <h3>Restaurants Near You</h3> */}
            </main>
        </div>
    )
}

export default Nutrition;
