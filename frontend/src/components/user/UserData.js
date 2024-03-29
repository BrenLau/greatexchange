import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { getUserThunk } from "../../store/user"
import userimage from "../NavBar/user.png"
import "./user.css"
import EditProfile from "./EditProfile"

const UserData = ({ setMessageId }) => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const session = useSelector(state => state.session.user)
    const user = useSelector(state => state.users[userId])
    const navigate = useNavigate()
    const [editProfile, setEditProfile] = useState(false)

    useEffect(() => {
        if (userId) {
            dispatch(getUserThunk({ userId }))
        }
    }, [dispatch])

    const onClick = (e) => {
        e.preventDefault()
        setMessageId(Number(userId))
        navigate('/messages', { replace: true })
        return
    }
    return (
        user ? <div className="userdatacontainer">
            {editProfile ? <EditProfile user={user} onClick={setEditProfile}></EditProfile> : null}
            {user?.id === session?.id ? <button className='editprofilebutton' onClick={() => {
                setEditProfile(true)
            }}>Edit Profile</button> : null}
            {session && session.id !== user.id ? <button className='editprofilebutton' onClick={onClick}>Send Message</button> : null}

            {<div className="imageandname">{user.username}<img className='userimageprofile' src={user.image ? user.image : userimage}></img></div>}
            <div className="summary">{user.summary}</div>
        </div> : null
    )
}

export default UserData
