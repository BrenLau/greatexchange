import { useState } from "react"
import { useDispatch } from "react-redux"
import BackDrop from "../modal/backdrop"
import { editListingThunk } from "../../store/listing"
import edit from '../../edit.png'

const EditListing = ({ listingId, currentRequest }) => {
    const [editModal, setEditModal] = useState(false)
    const dispatch = useDispatch()

    const [request, setRequest] = useState(currentRequest)

    const [requestError, setRequestError] = useState(false)
    const [errorMes, setErrorMes] = useState('')

    const onSubmit = async (e) => {
        if (request.trim().length < 5 || request.trim().length >= 500) {
            setRequestError(true)
        } else {
            setRequestError(false)
        }

        const res = await dispatch(editListingThunk({ listingId, request }))

        if (res.listing) {
            setEditModal(false)
            return
        }
        if (res.error) {
            setErrorMes(res.error)
            return
        }


    }
    return (
        <>
            <img src={edit} className='listingformsubmit buttonfix1' onClick={() => {
                setEditModal(true)
            }}></img>
            {editModal ? <BackDrop onClick={setEditModal}>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }
                } onClick={(e) => {
                    e.stopPropagation()
                }} className="listingform">
                    <h2 className="h2listingform">Create a listing</h2>
                    {errorMes ? <div className="listingerror">{errorMes}</div> : null}
                    <label className="listingformlabel">What do you want?{requestError ? <div className="listingerror">Request must be a length of at least 5 characters and less than 500 characters</div> : null}<input value={request} onChange={(e) => {
                        setRequest(e.target.value)
                    }} className="listingforminput1"></input></label>
                    <button type='submit' className="listingformsubmit" >Submit</button>
                </form>






            </BackDrop> : null}
        </>
    )
}

export default EditListing
