import BackDrop from "../modal/backdrop"
import { useDispatch } from "react-redux"
import { useState } from "react"
import x from '../../x.png'
import { deleteOfferThunk } from "../../store/offer"
import { getListingsThunk } from "../../store/listing"

const DeleteOffer = ({ offerId }) => {
    const dispatch = useDispatch()
    const [deleteOfferModal, setDeleteOfferModal] = useState(false)
    return (
        <>
            <img src={x} className='listingformsubmit buttonfix1' onClick={(e) => {
                setDeleteOfferModal(true)
            }}></img>
            {deleteOfferModal ? <BackDrop onClick={setDeleteOfferModal}>
                <div className='deletelistingdiv'>
                    <div>Are you sure you want to delete this offer?</div>
                    <div className="yndiv">

                        <button className='deletelistingbuttons' onClick={async (e) => {
                            await dispatch(deleteOfferThunk({ offerId })).then(() => {
                                dispatch(getListingsThunk())
                            })
                        }}>Yes</button>

                        <button className='deletelistingbuttons' onClick={(e) => {
                            setDeleteOfferModal(false)


                        }}>No</button></div></div></BackDrop> : null}
        </>
    )
}

export default DeleteOffer
