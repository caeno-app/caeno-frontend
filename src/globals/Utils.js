import UserDB from './userdb.js';
import FoodDB from './fooddb.js';

const updateUserVector = (userVector, userTotal, restaurantVector) => {
    let n = userTotal, R = restaurantVector;
    console.log(userVector, R, userTotal);
    return userVector.map((U, i) => {
        return ((n - 1) / n) * U + ((1 / n) * R[i]);
    })   
}

export {
    UserDB,
    FoodDB,
    updateUserVector
}