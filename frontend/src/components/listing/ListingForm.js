import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import BackDrop from "../modal/backdrop";
import './listing.css'

const ListingForm = ({ onClick, user }) => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items)

    const [itemId, setItemId] = useState('0')
    const [request, setRequest] = useState('')

    const [itemIdError, setItemIdError] = useState(false)
    const [requestError, setRequestError] = useState(false)

    useEffect((e) => {
        dispatch(getItemsThunk({ userId: user.id }))

    }, [dispatch])


    const onSubmit = async (e) => {
        if (itemId === '0') {
            setItemIdError(true)
        } else if (itemId) {
            setItemIdError(false)
        }
        if (request.trim().length < 5 || request.trim().length >= 500) {
            setRequestError(true)
        } else {
            setRequestError(false)
        }


    }

    if (!user) {
        return null
    }
    return (
        <BackDrop onClick={onClick}>
            <form onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
            }
            } onClick={(e) => {
                e.stopPropagation()
            }} className="listingform">
                <label className="listingformlabel">What do you want?{requestError ? <div className="listingerror">Request must be a length of at least 5 characters and less than 500 characters</div> : null}<input value={request} onChange={(e) => {
                    setRequest(e.target.value)
                }} className="listingforminput1"></input></label>
                <label className="listingformlabel">What are you listing?{itemIdError ? <div className="listingerror">Please select valid item</div> : null}<select value={itemId} className="listingforminput2" type='select' name='SelectItem' onChange={async (e) => {
                    e.preventDefault()
                    await setItemId(e.target.value)
                }}>
                    <option value={0}>Select item</option>
                    {Object.values(items).length > 0 ? Object.values(items).map(item => {
                        if (!item.listingId) {
                            return (
                                <option value={item.id}>{item.name}</option>
                            )
                        }
                    }) : null}
                </select></label>
                <button type='submit' className="listingformsubmit">Submit</button>
            </form>
        </BackDrop>
    )
}

export default ListingForm
