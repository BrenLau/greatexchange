import { useDispatch, useSelector } from "react-redux"
import BackDrop from '../modal/backdrop'
import { getUsersThunk } from "../../store/user"
import { useEffect } from "react"
import './messages.css'

const SearchUser = ({ onClick, currentUser, setMessageId }) => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])
    return (
        <BackDrop onClick={onClick}>
            <div className="searchuserbackground" onClick={(e) => {
                e.stopPropagation()
            }}>
                {Object.values(users).map(user => {
                    if (currentUser.id !== user.id) {
                        return (
                            <div onClick={(e) => {
                                setMessageId(user.id)
                                onClick()
                            }} className="eachuserinsearchuser">{user.username}<button className="buttontomessage">Message</button></div>

                        )
                    }
                })}
            </div>
        </BackDrop>
    )
}

export default SearchUser
