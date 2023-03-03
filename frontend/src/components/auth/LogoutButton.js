import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "./logout.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <div className='logoutdiv' onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
