import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Start from './components/Start';
import { MemoryRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {UserDB} from './globals/Utils';
import firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDecumsV6RXObHwPRRkcyE-T5foKLqJqtE",
    authDomain: "caeno-7144f.firebaseapp.com",
    databaseURL: "https://caeno-7144f.firebaseio.com",
    projectId: "caeno-7144f",
    storageBucket: "caeno-7144f.appspot.com",
    messagingSenderId: "710477581702",
    appId: "1:710477581702:web:c6ad220d1e33d4d13db007"
};
firebase.initializeApp(firebaseConfig);
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
