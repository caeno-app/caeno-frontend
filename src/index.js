import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { MemoryRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDecumsV6RXObHwPRRkcyE-T5foKLqJqtE",
    authDomain: "caeno-7144f.firebaseapp.com",
    databaseURL: "https://caeno-7144f.firebaseio.com",
    projectId: "caeno-7144f",
    storageBucket: "caeno-7144f.appspot.com",
    messagingSenderId: "710477581702",
    appId: "1:710477581702:web:c6ad220d1e33d4d13db007"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
