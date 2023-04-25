import { useState } from "react"
import BackDrop from "../modal/backdrop"
import './user.css'
import { useDispatch } from "react-redux"
import { editUserThunk } from "../../store/user"

const EditProfile = ({ onClick, user }) => {
    const dispatch = useDispatch()

    const [summary, setSummary] = useState(user.summary ? user.summary : '')
    const [image, setImage] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = { summary, image }
        await dispatch(editUserThunk({ summary, image, userId: user.id }))
    }

    return (
        <BackDrop onClick={onClick}>
            <form onSubmit={onSubmit} className='editprofileform' onClick={(e) => {
                e.stopPropagation()
            }}>
                <label>Summary<input value={summary} onChange={(e) => {
                    setSummary(e.target.value)
                }} type='textarea'></input></label>
                <label>Profile Picture<input onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) setImage(file)
                }} type='file'></input></label>
                <button>Submit</button>
            </form>
        </BackDrop>
    )
}

export default EditProfile
