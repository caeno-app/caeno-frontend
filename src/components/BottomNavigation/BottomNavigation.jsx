import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as DashIcon} from '../../assets/dash.svg';
import {ReactComponent as ProfileIcon} from '../../assets/profile.svg';
import {ReactComponent as ChartIcon} from '../../assets/chart.svg';
import {ReactComponent as NutritionIcon} from '../../assets/nutrition.svg';
import {ReactComponent as RestaurantIcon} from '../../assets/restaurant.svg';
import './BottomNavigation.scss';

const icons = {
    '/dash': <DashIcon />,
    '/restaurants': <RestaurantIcon/>,
    '/nutrition': <NutritionIcon/>,
    '/history': <ChartIcon/>,
    '/profile': <ProfileIcon/>,
}

const BottomNavigation = ({selected='/dash', pages}) => {

    // TODO: change getelements into a ref solution
    const $ = (el) => { return document.getElementById(el) }
    const [cur, setCur] = useState(selected);

    useEffect(() => {
        $(cur.substr(1)).classList.add('selected');
        return _ => {
            $(cur.substr(1)).classList.remove('selected');
        };
    }, [cur]);

    useEffect(() => {
        setCur(selected);
    }, [selected]);

    return (
        <nav>
            {pages.map(pg => <BottomNavigationTab 
                key={pg}
                page={pg}
                set={setCur}
            /> )}
        </nav>
    )
}
const BottomNavigationTab = ({page, set}) => {
    return (
        <Link
            to={page}
            onClick={set.bind(null, page)}
            id={page.substr(1)}
        >
            <div className="nav-item-icon-holder">
                {icons[page]}
            </div>
        </Link>
    );
}

export default BottomNavigation;
