import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BackDrop from "../modal/backdrop"
import { getItemsThunk } from "../../store/item"

const OfferForm = ({ listingId, user }) => {
    const dispatch = useDispatch()
    const myItems = useSelector(state => state.items)
    const [items, setItems] = useState({})
    const [openOfferModal, setOpenOfferModal] = useState(false)

    useEffect((e) => {
        dispatch(getItemsThunk({ userId: user?.id }))

    }, [dispatch])
    if (!listingId) {
        setOpenOfferModal(false)
    }

    return (
        <>
            <button onClick={(e) => {
                e.stopPropagation()
                setOpenOfferModal(true)
            }}>Make Offer</button>
            {openOfferModal ? <BackDrop onClick={setOpenOfferModal}>
                <form onClick={(e) => {
                    e.stopPropagation()
                }} className="offerform">
                    <label>Items
                        <select>
                            <option value={0}>Select item</option>
                            {Object.values(myItems).length > 0 ? Object.values(myItems).map(item => {
                                if (!item.listingId && !item.offerId && !items[item.id]) {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                }
                            }) : null}
                        </select>
                    </label>
                </form>
            </BackDrop> : null}
        </>
    )

}

export default OfferForm
