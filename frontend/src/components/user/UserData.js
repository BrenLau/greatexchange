import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { getUserThunk } from "../../store/user"
import userimage from "../NavBar/user.png"
import "./user.css"

const UserData = ({ messageId, setMessageId }) => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const session = useSelector(state => state.session.user)
    const user = useSelector(state => state.users[userId])
    const navigate = useNavigate()

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

            {user.image ? <div className="imageandname">{user.username}<img className='userimageprofile' src={user.image}></img></div> : <div className="imageandname">{user.username}<img className='userimageprofile' src={userimage}></img></div>}
            <div>{user.summary}</div>
            {session && session.id !== user.id ? <button onClick={onClick}>Send Message</button> : null}
        </div> : null
    )
}

export default UserData
