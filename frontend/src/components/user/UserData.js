import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { getUserThunk } from "../../store/user"

const UserData = ({ messageId, setMessageId }) => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const session = useSelector(state => state.session.user)
    const user = useSelector(state => state.users[userId])
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserThunk({ userId }))
    }, [dispatch])

    const onClick = (e) => {
        e.preventDefault()
        setMessageId(Number(userId))
        navigate('/messages', { replace: true })
        console.log(messageId)
        return
    }
    return (
        user ? <div>
            <div>{user.username}</div>
            {user ? <img src={user.image}></img> : null}
            <div>{user.summary}</div>
            {session && session.id !== user.id ? <button onClick={onClick}>Send Message</button> : null}
        </div> : null
    )
}

export default UserData
