const endpoint = `https://api.caeno.app`;

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
        let res = await fetch(`${endpoint}/api/elrestaurants?dist=2&lat=${lat}&lng=${lng}&vector=${JSON.stringify(vector.vector)}`);
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
const itemsNearLocation = async (lat, lng) => {
    try {
        let res = await fetch(`${endpoint}/api/elmenu?dist=2&lat=${lat}&lng=${lng}`);
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
        menu: menuItemAtLocation,
        items: itemsNearLocation,
    }
}