import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Start from './components/Start';
import { MemoryRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {UserDB} from './globals/Utils';

try{
    ReactDOM.render(
        <Router
            initialEntries={['/', '/login', '/app']}
            initialIndex={0} 
        >
            <Start />
        </Router>,
        document.getElementById('root')
    );
}
catch{
    UserDB.logout();
}




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
