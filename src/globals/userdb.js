import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let db;
let provider;

/**
 * @function init
 * @description initializes the firestore and fb auth 
 */
let init = () => {
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
    // provider = new firebase.auth.FacebookAuthProvider();
}



export default {
    init: init
}