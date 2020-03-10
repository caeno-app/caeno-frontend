import React from 'react';
import Theme, {current} from '../../globals/Theme';
import {UserDB} from '../../globals/Utils';
import {ReactComponent as UserIcon} from '../../assets/user.svg';
import Toggle from 'react-toggle';
import './Profile.scss';


const Profile = ({history}) => {
    const toggleTheme = () => { Theme(current() === 0 ? 1 : 0) }
    const logout = () => { UserDB.logout() }
    return (
        <div className="profile-wrapper">
            <div className="user">
                <UserIcon className="icon"/>
                <div className="name">{UserDB.get.user('name')}</div>
                <div className="email">{UserDB.get.user('email')}</div>
            </div>
            <div className="options">
                <h3>Settings: </h3>
                <div className="theme-set">
                    Dark Theme: 
                    <label>
                        <Toggle
                            defaultChecked={current() === 0}
                            icons={false}
                            onChange={toggleTheme} />
                    </label>
                </div>
            </div>
            <button className="logout" onClick={logout}>logout</button>
        </div>
    )
}

export default Profile;
