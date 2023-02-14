import { NavLink } from 'react-router-dom';
import './navbar.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

const UserButtons = ({ setloginbutts }) => {
    const user = useSelector(state => state.session.user)
    return (
        <div onMouseOut={(e) => {
            e.preventDefault()
            setloginbutts(false)
        }} className='loginsignup'>
            {!user ? <>
                <li className='loginsignupele'>
                    <NavLink className='navlinknav2' to='/login' exact={true} activeClassName='active'>
                        Login
                    </NavLink>
                </li>
                <li className='loginsignupele'>
                    <NavLink className='navlinknav2' to='/sign-up' exact={true} activeClassName='active'>
                        Sign up
                    </NavLink>
                </li>
            </> : <>
                <li className='loginsignupele'>
                    <LogoutButton />
                </li>
                <li className='loginsignupele'>
                    <NavLink className='navlinknav2' to={`/user/${user.id}`}>Profile</NavLink>
                </li>
            </>}
        </div>
    );
}

export default UserButtons;
