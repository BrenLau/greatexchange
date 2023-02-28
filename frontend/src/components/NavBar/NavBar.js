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

const NavBar = ({ isLoaded, setOpenListingForm }) => {
  const user = useSelector(state => state.session.user)
  const [loginbutts, setloginbutts] = useState(false)
  const [openBag, setOpenBag] = useState(false)

  return (
    <nav className='navbar-container' >
      <div className='closer'
        onMouseOver={(e) => {
          e.preventDefault()
          setloginbutts(false)
          setOpenBag(false)
        }}
      ></div>

      {openBag ? <ul onMouseOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setOpenBag(true)
      }} onMouseOut={(e) => {
        e.stopPropagation()
        e.preventDefault()
        setOpenBag(false)
      }
      } id='dropdown' className={openBag ? 'dropdown' : null}>
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
        <NavLink className='navlinknav' to='/' >
          <img className='boximage2' src={house}></img>
        </NavLink>
      </li>
      <li className='navbarli housebox3' ><button onClick={(e) => {
        e.preventDefault()
        setOpenListingForm(true)
      }}>Create Listing</button></li>
      <li className='navbarli housebox2'>
        <NavLink className='navlinknav' to='/users'  >
          Users
        </NavLink>
      </li>

      <li className='navbarli bagicon' onMouseOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setOpenBag(true)
        setloginbutts(false)
      }}
        onMouseOut={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpenBag(false)
        }}
        id='bagicon'>
        <img className='boximage' src={openBag ? open : box} ></img>
      </li>
      <li className='navbarli userbuttonsli'
        onMouseOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setloginbutts(true)
          setOpenBag(false)
        }}
      >
        {loginbutts ? <div>
          <UserButtons setloginbutts={setloginbutts} />
        </div> : null}
        <img className='boximage2' src={userimage}></img>
      </li>
    </nav>
  );
}

export default NavBar;
