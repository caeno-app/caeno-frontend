import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNavigation.scss';

const BottomNavigation = () => {
    return (
        <nav>
            <Link to='/'>
                I 1
            </Link>
            <Link to='/'>
                I 2
            </Link>
            <Link to='/'>
                I 3
            </Link>
            <Link to='/'>
                I 4
            </Link>
            <Link to='/'>
                I 5
            </Link>
        </nav>
    )
}

export default BottomNavigation;
