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
            {user?.id === userId ? <button onClick={(e) => {
                setDeleteSeekModal(true)
            }}>X</button> : null}
            {deleteSeekModal ? <BackDrop onClick={setDeleteSeekModal}>
                <div onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <button onClick={async (e) => {
                        await dispatch(deleteSeekingThunk({ seekingId })).then(() => {
                            setDeleteSeekModal(false)
                        })
                    }}>Delete</button>
                    <button onClick={(e) => {
                        setDeleteSeekModal(false)
                    }}>Cancel</button>
                </div>
            </BackDrop> : null}

        </>
    )
}

export default DeleteSeeking
