import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import BackDrop from "../modal/backdrop"

const OfferForm = ({ listingId, userId }) => {
    const dispatch = useDispatch()
    const [openOfferModal, setOpenOfferModal] = useState(false)
    if (!listingId) {
        setOpenOfferModal(false)
    }

    return (
        <>
            <button onClick={(e) => {
                setOpenOfferModal(true)
            }}>Make Offer</button>
            {openOfferModal ? <BackDrop onClick={setOpenOfferModal}>
                <form className="offerform">
                    <label>Items
                        <select>

                        </select>
                    </label>
                </form>
            </BackDrop> : null}
        </>
    )

}

export default OfferForm
