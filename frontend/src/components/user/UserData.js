import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getUserThunk } from "../../store/user"

const UserData = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const session = useSelector(state => state.session.user)
    const user = useSelector(state => state.users[userId])

    useEffect(() => {
        dispatch(getUserThunk({ userId }))
    }, [dispatch])

    return (
        user ? <div>
            <div>{user.username}</div>
            {user ? <img src={user.image}></img> : null}
            <div>{user.summary}</div>
            {session && session.id !== user.id ? <button>Send Message</button> : null}
        </div> : null
    )
}

export default UserData
