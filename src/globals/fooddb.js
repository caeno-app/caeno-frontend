
/**
 * @TODO setup https for server
 */
// const endpoint = `http://api.caeno.app`;
const endpoint = `http://172.112.215.241`;

/**
 * @documentation - https://github.com/caeno-app/caeno-backend
 * 
 * @description gets list of restaurants near location
 * 
 * @param {Number} lat 
 * @param {Number} lng
 */
const restaurantsNearLocation = async (lat, lng, vector) => {
    try {
        let res = await fetch(`${endpoint}/api/elrestaurants?dist=1&lat=${lat}&lng=${lng}&vector=${JSON.stringify(vector.vector)}`);
        res = await res.json();
        return res;
    } catch (err) {
        console.error(err);
        return [];
    }
}
const menuItemAtLocation = async (id) => {
    try {
        let res = await fetch(`${endpoint}/api/elmenulist?brandid=${id}`);
        res = await res.json();
        return res;
    } catch (err) {
        console.error(err);
        return [];
    }
}
export default {
    get: {
        location: restaurantsNearLocation,
        menu: menuItemAtLocation
    }
}