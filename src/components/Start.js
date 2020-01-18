/**
 * @author Ryan Yang
 * @description Start component to route user to either login or app page
 */

import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Theme from '../globals/Theme';
import BottomNavigation from './BottomNavigation/BottomNavigation';
import { userdb } from '../globals/Utils';
import './Start.scss';

const Start = () => {
	useEffect(() => { Theme(0) }, []);
	return (
		<Switch>
			<Route exact path="/">
				home
			</Route>
			<Route path="/app">
				<App />
			</Route>
		</Switch>
	);
}

const App = () => {
	return (
		<div>
			<BottomNavigation />
		</div>
	);
}

export default Start;
