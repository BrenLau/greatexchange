import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'
import UserButtons from './UserButtons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import box from './treasure.png'
import open from './open.png'
import house from './house.png'
import userimage from './user.png'
import auction from './auction.png'
import marketplace from './online-shopping.png'

const NavBar = ({ isLoaded }) => {
  const user = useSelector(state => state.session.user)
  const [loginbutts, setloginbutts] = useState(false)
  const [openBag, setOpenBag] = useState(false)

  return (
    <nav className='navbar-container'>
      {openBag ? <ul id='dropdown' className={openBag ? 'dropdown' : null}>
        <li className='navbarli2'>
          <img className='boximage2' src={marketplace}></img>
          <NavLink to='/marketplace' className='navlinknav'>Market</NavLink>
        </li>
        <li className='navbarli2'>
          <img className='boximage2' src={auction}></img>
          <NavLink to='/offers' className='navlinknav'>Offers</NavLink>
        </li>
      </ul> : null}

      <li className='navbarli housebox'>
        <NavLink className='navlinknav' to='/' exact={true} activeClassName='active'>
          <img className='boximage2' src={house}></img>
        </NavLink>
      </li>
      <li className='navbarli housebox2'>
        <NavLink className='navlinknav' to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </li>

      <li className='navbarli bagicon' onClick={(e) => {
        e.preventDefault()
        setOpenBag(!openBag)
      }} id='bagicon'>
        <img className='boximage' src={openBag ? open : box} ></img>
      </li>
      <li className='navbarli userbuttonsli'
        onClick={(e) => {
          e.preventDefault()
          setloginbutts(!loginbutts)
        }}
      >
        {loginbutts ? <div>
          <UserButtons />
        </div> : null}
        <img className='boximage2' src={userimage}></img>
      </li>
    </nav>
  );
}

export default NavBar;
