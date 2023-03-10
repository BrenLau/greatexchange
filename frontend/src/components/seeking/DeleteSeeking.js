import { deleteSeekingThunk } from "../../store/seeking"
import { useDispatch } from "react-redux"
import BackDrop from "../modal/backdrop"
import { useState } from "react"

const DeleteSeeking = ({ seekingId }) => {
    const dispatch = useDispatch()
    const [deleteSeekModal, setDeleteSeekModal] = useState(false)
    return (
        <>
            <button onClick={(e) => {
                setDeleteSeekModal(true)
            }}>X</button>
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
