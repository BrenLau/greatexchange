import { NavLink } from 'react-router-dom';
import './navbar.css'
import { useState } from 'react';

const UserButtons = () => {
    return (
        <div className='loginsignup'>
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
        </div>
    );
}

export default UserButtons;
