import { createContext } from 'react';
import Swal from 'sweetalert2';

const LocationContext = createContext({
    lat: 0,
    lng: 0,
    accuracy: -1
});

const getDefaultLocation = () => {
    let locationData = localStorage.getItem('location');
    if(locationData === null){
        return {lat: 0, lng: 0, accuracy: -1}
    }
    return JSON.parse(locationData);
}

const getLocation = () => {
    const locationError = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Can't get location!`,
            footer: '<a href="https://support.google.com/chrome/answer/142065">Why do I have this issue?</a>'
        });
    }
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition( 
            pos => {
                let data = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy
                }
                localStorage.setItem('location', JSON.stringify(data));
                resolve(data);
            }, err => {
                locationError();
                reject(err);
            },
            { timeout: 5000 }
        );
    })
}

export default LocationContext;
export {
    getLocation,
    getDefaultLocation
}
