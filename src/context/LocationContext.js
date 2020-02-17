import { createContext } from 'react';
import Swal from 'sweetalert2';

const getLocation = () => {
    navigator.geolocation.getCurrentPosition( 
        pos => {
            localStorage.setItem('location', JSON.stringify({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                accuracy: pos.coords.accuracy
            }));
        }, err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Can't get location!`,
                footer: '<a href="https://support.google.com/chrome/answer/142065">Why do I have this issue?</a>'
            });
        },
        { timeout: 5000 }
    );
}

export default createContext({
    lat: 0,
    lng: 0,
    accuracy: -1
});

export {
    getLocation
}
