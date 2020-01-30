import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {UserDB} from '../../globals/Utils';
import './Login.scss';

const Login = () => {
	const [loggedIn, setloggedIn] = useState(false);
	const promptLogin = () => {
		UserDB.login.google(() => {
			setloggedIn(true);
		});
	}
	return (
		<div className="login-wrapper">
			<button className="Google" onClick={promptLogin}> Login with Google </button>
			{loggedIn && <Redirect to="/app" />}
		</div>
	);
}

export default Login;
