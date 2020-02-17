/**
 * @author Ryan Yang
 * @description Start component to route user to either login or app page
 */

import React, { useEffect } from 'react';
import { MemoryRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Theme, {current as SavedTheme} from '../globals/Theme';
import BottomNavigation from './BottomNavigation/BottomNavigation';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile/Profile';
import Restaurants from './Restaurants/Restaurants';
import Nutrition from './Nutrition/Nutrition';
import Add from './Add/Add';
import Login from './Login/Login';
import { UserDB } from '../globals/Utils';
import LocationContext from '../context/LocationContext';
import './Start.scss';


const Start = ({history}) => {
	useEffect(() => {
		Theme(SavedTheme());
		UserDB.init();
		UserDB.login.check( user => {
			history.push( user ? '/app' : '/login');
		});
	}, [history]);
	return (
		<Switch>
			<Route exact path='/'>
			</Route>
			<Route path='/login'>
				<Login />
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
		<LocationContext.Provider value={{lat: 0, lng: 0, accuracy: -1}}>
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
		</LocationContext.Provider>
	);
}

export default withRouter(Start);
