import {useState} from 'react';
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
 * Check if local storage exists: from MDN
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 * @param {string of storage type} type 
 */
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

/**
 * @function setUserData
 * Sets the userData into localstorage if localstorage exists
 * @param {firebase user object} user
 */
const setUserData = (user) => {
    if(!storageAvailable('localStorage')) return;

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
 * @function getUserData - gets stored user meta data from firebase
 * returns parsed json
 */
const getUserData = () => {
    if(!storageAvailable('localStorage')) return;
    return JSON.parse(localStorage.getItem('user'));
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

const setWeather = (weather) => {
    let weatherData = {
        ...weather,
        timestamp: (new Date()).toISOString()
    }
    localStorage.setItem('weather', JSON.stringify(weatherData));
}
const getWeather = (weather) => {
    let weatherData = localStorage.getItem('weather');
    if(weatherData !== null && (new Date() - new Date(weatherData.timestamp) > 43200))
        weatherData = null;
    return weatherData;
}

const getLocation = (callback=()=>{return;}) => {
    let geo = navigator.geolocation;
    if(geo){
        geo.getCurrentPosition( 
            pos => {
                localStorage.setItem('location', JSON.stringify({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy
                }));
                callback(pos.coords);
            }, err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Can't get location!`,
                    footer: '<a href="https://support.google.com/chrome/answer/142065">Why do I have this issue?</a>'
                  })
            },
            {timeout: 4000}
        );
    }
}
const getSavedLocation = () => {
    return localStorage.getItem('location');
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

const defaultError = (error) => {
    alert(error);
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
        meta: getUserData,
        weather: getWeather,
        location: getLocation,
        savedLocation: getSavedLocation
    }
}