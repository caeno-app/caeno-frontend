
/**
 * @TODO setup https for server
 */
const endpoint = `http://api.caeno.app`;

/**
 * @documentation - https://github.com/caeno-app/caeno-backend
 * 
 * @description gets list of restaurants near location
 * 
 * @param {Number} lat 
 * @param {Number} lng
 */
const restaurantsNearLocation = async (lat, lng) => {
    try {
        let res = await fetch(`${endpoint}/api/elrestaurants?dist=2&lat=${lat}&lng=${lng}`);
        res = await res.json();
        return res;
    } catch (err) {
        console.error(err);
        return [];
    }
}
export default {
    get: {
        location: restaurantsNearLocation
    }
}