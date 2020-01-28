import {useState} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let db;
let provider;

/**
 * @function init
 * @description initializes the firestore and fb auth 
 */
const init = () => {
    db = firebase.firestore(); 
    // db.enablePersistence().catch( err => {
    //     if (err.code === 'failed-precondition') {
    //         // Multiple tabs open, persistence can only be enabled
    //         // in one tab at a a time.
    //     } else if (err.code === 'unimplemented') {
    //         // The current browser does not support all of the
    //         // features required to enable persistence
    //     }
    // });
    provider = new firebase.auth.GoogleAuthProvider();
}
/**
 * Check if local storage exists: from MDN
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 * @param {string of storage type} type 
 */
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__test__';
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
 * Checks if user data exists in localstorage, otherwise get from firestore
 */
const getUserData = () => {
    // const getUserDataFromFirebase = () => {
    //     let auth = firebase.auth();
    //     return {
    //         name: auth.getDisplayName(),
    //         email: auth.getEmail(),
    //         provider: auth.getProviderId(),
    //         anon: auth.isAnonymous(),
    //         id: auth.getUid()
    //     }
    // }
    // if(storageAvailable('localStorage')){
    //     let userData = localStorage.getItem('user');
    //     if(userData !== null) return userData;

    //     localStorage.setItem('user', getUserDataFromFirebase());
    //     return userData;
    // }
    // return getUserDataFromFirebase();
    console.log(firebase.auth().currentUser());
    return {
        name: "sdf"
    }
}

const checkIfLoggedIn = ( callback ) => {
    firebase.auth().onAuthStateChanged( user => {
        if(user){
            callback(true);
        }
        callback(false);
    });
}

const promptLoginGoogle = ( callback ) => {
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        console.log(result);
        // callback(result);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error);
      });      
}

const logout = (cb, err=defaultError) => {
    firebase.auth().signOut().then(function() {

    }).catch(function(error) {
        err(error);
    });      
}

// const getUserData = (cb) => {
//     cb({
//         id: 'd3hsDA3',
//         fname: 'Ryan',
//         lname: 'Yang',
//     });
// }

const defaultError = (error) => {
    alert(error);
}

export default {
    init: init,
    login: {
        check: checkIfLoggedIn,
        google: promptLoginGoogle,
    },
    logout: logout,
    get: {
        user: getUserData
    }
}