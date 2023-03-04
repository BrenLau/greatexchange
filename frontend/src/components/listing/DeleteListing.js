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
            {deleteModal ? <BackDrop onClick={setDeleteModal}>
                <div className='deletelistingdiv'>
                    <div>Are you sure you want to delete this listing?</div>
                    <div className="yndiv">

                        <button className='deletelistingbuttons' onClick={async (e) => {
                            await dispatch(deleteListingThunk({ listingId }))
                        }}>Yes</button>

                        <button className='deletelistingbuttons' onClick={(e) => {
                            setDeleteModal(false)


                        }}>No</button></div></div></BackDrop> : null}
        </>
    )
}

export default DeleteListing
