import React from 'react';
import './Searchbar.scss';

const Searchbar = ({placeholder="How can I help you today?"}) => {
    return (
        <div className="search-wrapper">
            <input type="text" placeholder={placeholder}/>
        </div>
    )
}

export default Searchbar;
