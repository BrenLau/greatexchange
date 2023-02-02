import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'
import UserButtons from './UserButtons';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [loginbutts, setloginbutts] = useState(false)
  return (
    <nav className='navbar-container'>
      <li className='navbarli'>
        <NavLink className='navlinknav' to='/' exact={true} activeclassname='active'>
          Home
        </NavLink>
      </li>
      <li className='navbarli'>
        <NavLink className='navlinknav' to='/users' exact={true} activeclassname='active'>
          Users
        </NavLink>
      </li>
      {!user ? <li className='navbarli userbuttonsli'
        onClick={(e) => {
          e.preventDefault()
          setloginbutts(!loginbutts)
        }}
      >
        {loginbutts ? <div>
          <UserButtons />
        </div> : null}
        Login

      </li> :
        <li className='navbarli'>
          <LogoutButton />
        </li>}
    </nav>
  );
}

export default NavBar;
