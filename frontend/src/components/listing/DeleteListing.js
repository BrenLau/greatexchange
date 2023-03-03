import BackDrop from "../modal/backdrop"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { deleteListingThunk } from "../../store/listing"
import x from '../../x.png'

const DeleteListing = ({ listingId }) => {
    const dispatch = useDispatch()
    const [deleteModal, setDeleteModal] = useState(false)
    return (
        <>
            <img src={x} className='listingformsubmit buttonfix1' onClick={(e) => {
                setDeleteModal(true)
            }}></img>
            {deleteModal ? <BackDrop onClick={setDeleteModal}><button onClick={async (e) => {
                await dispatch(deleteListingThunk({ listingId }))
            }}>Delete</button><button onClick={(e) => {
                setDeleteModal(false)
            }}>Cancel</button></BackDrop> : null}
        </>
    )
}

export default DeleteListing
