import * as firebase from 'firebase/app';
import Swal from 'sweetalert2';
import 'firebase/auth';
import 'firebase/firestore';

let db;

/**
 * @function init
 * @description initializes the firestore and fb auth 
 */
const init = () => {
    db = firebase.firestore(); 
    db.enablePersistence().catch( err => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
        } else if (err.code === 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
        }
    });
}

/**
 * @function setUserData
 * Sets the userData into localstorage if localstorage exists
 * @param {firebase user object} user
 */
const setUserData = (user) => {
    let userData = {
        name: user.displayName,
        email: user.email,
        emailverified: user.emailVerified,
        anon: user.isAnonymous,
        id: user.uid
    };

    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
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
    firebase.auth().signOut().then(function() {
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

    if(currentUser[property] !== null)
        return currentUser.user[property];

    switch(property){
        case 'user':
            return "buddy";
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
        // google: promptLoginGoogle,
    },
    logout: logout,
    set:{
        weather: setWeather
    },
    get: {
        user: getUser,
        weather: getWeather
    }
}