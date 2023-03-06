import logo from './logo.png'
import './home.css'
import { NavLink } from 'react-router-dom'

const Home = ({ user }) => {
    return (
        <div className='logoholder'>
            <img className='homelogo' src={logo}></img>
            {!user ? <div className='homepagebuttons'><NavLink className='homepagebutton' to='/login'>Login</NavLink><NavLink className='homepagebutton' to='/sign-up'>Signup</NavLink></div> : <div className='welcome'>Welcome to the Great Exchange, {user.username}</div>}
            <div className='aboutge'>
                <h1 className='h1ge'>The Great Exchange!</h1>
                <div className='aboutwords'>A place where traders can exchange items for anything! Add items, list them on the marketplace,
                    make offers for listed items, make comments, and chat with other users. Discuss meetup points to make the exchanges or
                    ship the exchanges. An alternate solution that may be implemented would be a middleman service for exchanges to ship through.</div>
            </div>
        </div>
    )
}

export default Home
