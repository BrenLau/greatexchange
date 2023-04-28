import { NavLink, useNavigate } from 'react-router-dom';
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
import CreateSeeking from '../seeking/CreateSeeking';
import { Route, Routes } from 'react-router-dom';
import AddItemButton from '../items/addItemButton';


const NavBar = ({ isLoaded, setOpenListingForm }) => {
  const navigate = useNavigate()
  const user = useSelector(state => state.session.user)
  const [loginbutts, setloginbutts] = useState(false)
  const [openBag, setOpenBag] = useState(false)

  const CreateListing = () => {
    return user ? <li className='navbarli housebox3' ><button className='navlinknav' onClick={(e) => {
      e.preventDefault()
      setOpenListingForm(true)
    }}>Create Listing</button></li> : null
  }


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
        <li onClick={() => {
          navigate('/marketplace')
        }} className='navbarli2'>
          <img className='boximage2' src={marketplace}></img>
          <NavLink to='/marketplace' className='navlinknav5'>Market</NavLink>
        </li>
        <li onClick={() => {
          navigate('/seekings')
        }} className='navbarli2'>
          <img className='boximage2' src={auction}></img>
          <NavLink to='/seekings' className='navlinknav5'>Seekings</NavLink>
        </li>
        {user ? <li onClick={() => {
          navigate('/messages')
        }} className='navbarli2'>
          <img className='boximage2' src={marketplace}></img>
          <NavLink to='/messages' className='navlinknav5'>Messages</NavLink>
        </li> : null}
      </ul> : null}

      <li className='navbarli housebox'>
        <NavLink className='navlinknav' to='/' >
          <img className='boximage2' src={house}></img>
        </NavLink>
      </li>

      <Routes>
        <Route path={`/user/${user?.id}`} element={<li className='navbarli housebox3'><AddItemButton /></li>}></Route>
        <Route exact path='/marketplace' element={<CreateListing />}>
        </Route>
        <Route exact path='/seekings' element={user ? <li className='navbarli housebox3'><CreateSeeking /></li> : null}>
        </Route>
      </Routes>

      {/* <li className='navbarli housebox2'>
        <NavLink className='navlinknav' to='/users'  >
          Users
        </NavLink>
      </li> */}

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
        <img className='boximage2' src={user?.image ? user.image : userimage}></img>
      </li>
    </nav>
  );
}

export default NavBar;
