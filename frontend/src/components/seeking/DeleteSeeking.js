import { deleteSeekingThunk } from "../../store/seeking"
import { useDispatch, useSelector } from "react-redux"
import BackDrop from "../modal/backdrop"
import { useState } from "react"

const DeleteSeeking = ({ seekingId, userId }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [deleteSeekModal, setDeleteSeekModal] = useState(false)
    return (
        <>
            {user?.id === userId ? <button className='deleteseekingbutton' onClick={(e) => {
                setDeleteSeekModal(true)
            }}>x</button> : null}
            {deleteSeekModal ? <BackDrop onClick={setDeleteSeekModal}>
                <div className='deletedivseeking' onClick={(e) => {
                    e.stopPropagation()
                }}>Are you sure?
                    <button className='seekingbut' onClick={async (e) => {
                        await dispatch(deleteSeekingThunk({ seekingId })).then(() => {
                            setDeleteSeekModal(false)
                        })
                    }}>Delete</button>
                    <button className='seekingbut' onClick={(e) => {
                        setDeleteSeekModal(false)
                    }}>Cancel</button>
                </div>
            </BackDrop> : null}

        </>
    )
}

export default DeleteSeeking
