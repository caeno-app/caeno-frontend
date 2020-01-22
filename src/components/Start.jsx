/**
 * @author Ryan Yang
 * @description Start component to route user to either login or app page
 */

import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import Theme, {current as SavedTheme} from '../globals/Theme';
import BottomNavigation from './BottomNavigation/BottomNavigation';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile/Profile';
import Restaurants from './Restaurants/Restaurants';
import Nutrition from './Nutrition/Nutrition';
import Add from './Add/Add';
import { userdb } from '../globals/Utils';
import './Start.scss';

const Start = () => {
	useEffect(() => { Theme(SavedTheme()) }, []);
	return (
		<Switch>
			<Route exact path='/'>
				home
			</Route>
			<Route path='/app'>
				<App />
			</Route>
		</Switch>
	);
}

const App = () => {
	const pages = [
		'/dash',
		'/restaurants',
		'/add',
		'/nutrition',
		'/profile',
	];
	return (
		<Router initialEntries={pages} initialIndex={0}>
			<Switch>
				<Route exact path='/dash' component={Dashboard} />
				<Route exact path='/restaurants' component={Restaurants} />
				<Route exact path='/add' component={Add} />
				<Route exact path='/nutrition' component={Nutrition} />
				<Route exact path='/profile' component={Profile} />
			</Switch>
			<BottomNavigation pages={pages}/>
		</Router>
	);
}

export default Start;
