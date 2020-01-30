import React from 'react';
import Theme, {current} from '../../globals/Theme';
import {UserDB} from '../../globals/Utils';
import './Profile.scss';


const Profile = ({history}) => {
    const toggleTheme = () => { Theme(current() === 0 ? 1 : 0) }
    const logout = () => { UserDB.logout() }
    return (
        <div className="profile-wrapper">
            <button className="theme-set" onClick={toggleTheme}></button>
            <button className="logout" onClick={logout}>logout</button>
        </div>
    )
}

export default Profile;
