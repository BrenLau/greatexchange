import { useDispatch, useSelector } from "react-redux"
import BackDrop from '../modal/backdrop'
import { getUsersThunk } from "../../store/user"
import { useEffect } from "react"

const SearchUser = ({ onClick, currentUser }) => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsersThunk())
    }, [dispatch])
    return (
        <BackDrop onClick={onClick}>
            <div onClick={(e) => {
                e.stopPropagation()
            }}>
                {Object.values(users).map(user => {
                    if (currentUser.id !== user.id) {
                        return (
                            <div>{user.username}</div>
                        )
                    }
                })}
            </div>
        </BackDrop>
    )
}

export default SearchUser
