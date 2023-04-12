import { useSelector } from "react-redux"

const SearchUser = () => {
    const users = useSelector(state => state.users)
    return (
        <div>Users</div>
    )
}

export default SearchUser
