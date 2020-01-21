import React from 'react';
import Theme, {current} from '../../globals/Theme';
import './Profile.scss';


const Profile = () => {
    const toggleTheme = () => { Theme(current() === 0 ? 1 : 0) }
    return (
        <div className="profile-wrapper">
            <button className="theme-set" onClick={toggleTheme}></button>
        </div>
    )
}

export default Profile;
