
/**
 * @TODO setup https for server
 */
const endpoint = `http://172.112.215.241`;

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
        let res = await fetch(`${endpoint}/el/restaurantslocation?dist=10&lat=${lat}&lng=${lng}`);
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