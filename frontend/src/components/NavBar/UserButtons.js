import { NavLink } from 'react-router-dom';
import './navbar.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

const UserButtons = () => {
    const user = useSelector(state => state.session.user)
    return (
        <div className='loginsignup'>
            {!user ? <>
                <li className='loginsignupele'>
                    <NavLink className='navlinknav' to='/login' exact={true} activeClassName='active'>
                        Login
                    </NavLink>
                </li>
                <li className='loginsignupele'>
                    <NavLink className='navlinknav' to='/sign-up' exact={true} activeClassName='active'>
                        Sign up
                    </NavLink>
                </li>
            </> : <>
                <li className='loginsignupele'>
                    <LogoutButton />
                </li>

            </>}
        </div>
    );
}

export default UserButtons;
