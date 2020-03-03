import firebase from 'firebase/app';
import Swal from 'sweetalert2';
import 'firebase/auth';
import 'firebase/firestore';
import { current } from './Theme';

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

let db;

/**
 * @function init
 * @description initializes the firestore and fb auth 
 */
const init = () => {
    db = firebase.firestore(); 
    db.enablePersistence().catch( err => {
        console.error(err.code);
    });
}

/**
 * @function setUserData
 * Sets the userData into localstorage if localstorage exists
 * @param {firebase user object} user
 */
const setUserData = (user) => {
    currentUser.user = {
        name: user.displayName,
        email: user.email,
        emailverified: user.emailVerified,
        anon: user.isAnonymous,
        id: user.uid,
        preferences: null
    };
    db.collection('users').doc(currentUser.user.id).get().then(doc =>{
        if (doc.exists) {
            currentUser.user.preferences = doc.data();
        } else {
            db.collection("users").doc(currentUser.user.id).set({
                total: 0,
                vector: Array(11).fill(0),
                history: []
            })
            .then(() => {
                currentUser.user.preferences = {
                    total: 0,
                    vector: Array(11).fill(0),
                    history: []
                };
            })
            .catch(err => {
                console.error("Error writing document: ", err);
            });
        }
    }).catch(err => {
        console.log("Error getting document:", err);
    });
    localStorage.setItem('user', JSON.stringify(currentUser.user));
    return current.user;
}

const setUserVector = (vector, total, history, cb) => {
    db.collection('users').doc(currentUser.user.id).set({
        vector: vector,
        total: total,
        history: history
    }).then(() => {
        currentUser.user.preferences = {
            vector: vector,
            total: total,
            history: history
        };
        cb();
    }).catch(err => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
        })
    });
}
/**
 * Checks if user is currently logged in, and set localstorage if true
 * @param {function} callback 
 */
const checkIfLoggedIn = ( callback ) => {
    firebase.auth().onAuthStateChanged( user => {
        if(user) setUserData(user);
        callback(user);
    });
}


const logout = (cb, err=defaultError) => {
    firebase.auth().signOut().then(() => {
        let theme = localStorage.getItem('theme');
        localStorage.clear();
        localStorage.setItem('theme', theme);
        window.location.reload();
    }).catch(function(error) {
        err(error);
    });      
}

const getUser = (property=null) => {
    if(property === null)
        return currentUser.user;

    if(currentUser.user !== null && currentUser.user[property] !== null)
        return currentUser.user[property];

    switch(property){
        case 'name':
            return "";
        case 'email':
            return "";
        case 'preferences':
            return Array(11).fill(0);
        default:
            return null;
    }
}
const getWeather = () => {
    return currentUser.weather;
}
const setWeather = (weather) => {
    let weatherData = {
        ...weather,
        timestamp: (new Date()).toISOString()
    }
    localStorage.setItem('weather', JSON.stringify(weatherData));
}
const readWeather = () => {
    let weatherData = localStorage.getItem('weather');
    if(weatherData !== null && (new Date() - new Date(weatherData.timestamp) > 43200))
        weatherData = null;
    return weatherData;
}

const currentUser = {
    location: JSON.parse(localStorage.getItem('location')),
    weather: readWeather(),
    user: JSON.parse(localStorage.getItem('user')),
}
const defaultError = (error) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
    });
}

export default {
    init: init,
    login: {
        check: checkIfLoggedIn,
    },
    logout: logout,
    set:{
        weather: setWeather,
        user: setUserVector
    },
    get: {
        user: getUser,
        weather: getWeather
    }
}