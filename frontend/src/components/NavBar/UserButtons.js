import { NavLink } from 'react-router-dom';
import './navbar.css'
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

const UserButtons = ({ setloginbutts }) => {
    const user = useSelector(state => state.session.user)
    return (
        <div onMouseOut={(e) => {
            e.preventDefault()
            setloginbutts(false)
        }} className='loginsignup'>
            {!user ? <>
                <div className='loginsignupele'>
                    <NavLink className='navlinknav2' to='/login' >
                        Login
                    </NavLink>
                </div>
                <div className='loginsignupele'>
                    <NavLink className='navlinknav2' to='/sign-up' >
                        Sign up
                    </NavLink>
                </div>
            </> : <>
                <div className='loginsignupele'>
                    <LogoutButton />
                </div>
                <div className='loginsignupele'>
                    <NavLink className='navlinknav2' to={`/user/${user.id}`}>Profile</NavLink>
                </div>
            </>}
        </div>
    );
}

export default UserButtons;
