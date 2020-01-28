/**
 * @author Ryan Yang
 * @description Start component to route user to either login or app page
 */

import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import Theme, {current as SavedTheme} from '../globals/Theme';
import BottomNavigation from './BottomNavigation/BottomNavigation';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile/Profile';
import Restaurants from './Restaurants/Restaurants';
import Nutrition from './Nutrition/Nutrition';
import Add from './Add/Add';
// import { userdb } from '../globals/userdb.js';
import userdb from '../globals/userdb';
import './Start.scss';

const Start = (props) => {
	useEffect(() => {
		Theme(SavedTheme());
		userdb.init();
		userdb.login.check((user) => {
			if(user) props.history.push('/app');
		});
		// userdb.logout();
	}, []);
	return (
		<Switch>
			<Route exact path='/'>
				<Link to='/app' >
					Go to App
				</Link>
				<Link to='/login'>
					Go to Login
				</Link>
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
const Login = () => {
	const [loggedIn, setloggedIn] = useState(false);
	const promptLogin = () => {
		userdb.login.google(() => {
			setloggedIn(true);
		});
	}
	return (
		<div>
			THis is login pages
			<button onClick={promptLogin}> login with google </button>
			{loggedIn && <Redirect to="/app" />}
		</div>
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

export default withRouter(Start);
