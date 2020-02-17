import React, {useEffect, useState} from 'react';
import {UserDB} from '../globals/Utils';

const withLocation = Component => props => {
    return <Component {...props} />
}

export default Location;