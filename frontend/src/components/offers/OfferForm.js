import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BackDrop from "../modal/backdrop"
import { getItemsThunk } from "../../store/item"
import AddItemButton from "../items/addItemButton"
import './offerform.css'

const OfferForm = ({ listingId, user }) => {
    const dispatch = useDispatch()
    const myItems = useSelector(state => state.items)
    const [items, setItems] = useState({})
    const [selected, setSelected] = useState(null)
    const [openOfferModal, setOpenOfferModal] = useState(false)

    useEffect((e) => {
        dispatch(getItemsThunk({ userId: user?.id }))

    }, [dispatch])
    if (!listingId) {
        setOpenOfferModal(false)
    }

    const itemSubmit = (e) => {

    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (selected) {
            const currentItems = { ...items }
            currentItems[selected] = myItems[selected]
            setItems(currentItems)
        }
    }

    return (
        <>
            <button onClick={(e) => {
                e.stopPropagation()
                setOpenOfferModal(true)
            }}>Make Offer</button>
            {openOfferModal ? <BackDrop onClick={setOpenOfferModal}>
                <div onClick={(e) => {
                    e.stopPropagation()
                }} className="offerform">

                    <AddItemButton newClass='additembutton3' />
                    <h2 className="h2makeoffer">Make an Offer</h2>
                    <form className='formforoffers' onSubmit={onSubmit} onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <label>Items
                            <select onChange={(e) => {
                                setSelected(e.target.value)
                            }}>
                                <option value={0}>Select item</option>
                                {Object.values(myItems).length > 0 ? Object.values(myItems).map(item => {
                                    if (!item.listingId && !item.offerId && !items[item.id]) {
                                        return (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    }
                                }) : null}
                            </select>
                            <button onClick={itemSubmit}>Submit item</button>
                        </label>
                        <div>Items offered: {Object.values(items).map(item => {
                            return (
                                <div className="eachItemHolder">
                                    <button className='delanitem' onClick={(e) => {
                                        e.preventDefault()
                                        const currentItems = { ...items }
                                        delete currentItems[item.id]
                                        setItems(currentItems)
                                    }}>X</button>
                                    <div className="itemnameoffer">{item.name}</div>
                                    {item.image ? <img className='itemimage2' src={item?.image}></img> : <img className='itemimage2' src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}

                                </div>
                            )
                        })}</div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </BackDrop> : null}
        </>
    )

}

export default OfferForm
