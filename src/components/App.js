import React, { useState, useEffect } from 'react';
import Theme from '../globals/Theme';
import { Route } from 'react-router-dom';
import './App.scss';

const App = () => {
	const [theme, setTheme] = useState(0);

	useEffect(() => {
		Theme(theme);
	}, [theme]);

	return (
		<div className="site-wrapper">
			<Route path="/">
				home
			</Route>
			<Route path="/app">

			</Route>
		</div>
	);
}

export default App;
