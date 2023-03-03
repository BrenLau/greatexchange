import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "./logout.css"
import { useNavigate } from 'react-router';


const LogoutButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    navigate('/', { replace: true })
  };

  return <div className='logoutdiv' onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
