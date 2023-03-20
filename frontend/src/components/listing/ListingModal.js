import { useState } from "react";
import BackDrop from "../modal/backdrop";
import DeleteListing from "./DeleteListing";
import EditListing from "./EditListing";
import { csrfFetch } from "../../store/csrf";
import { getListingsThunk } from "../../store/listing";
import { useDispatch } from "react-redux";

const ListingModal = ({ listing, user, onClick }) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if (content.trim().length == 0) {
            return
        }
        const data = { content, user, listingId: listing.id }
        await csrfFetch(`/api/comments`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(() => {
            dispatch(getListingsThunk())
        }).then(() => {
            setContent('')
        })
    }
    return (
        <BackDrop onClick={onClick}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} key={listing?.id} className="listinglimodal">

                <h3 className="h3listingmodal">{listing?.Item?.name}</h3>

                {user && (user?.id === listing?.userId) ? <div className="listbutdivmodal">
                    <DeleteListing listingId={listing?.id} />
                    <EditListing currentRequest={listing?.request} listingId={listing?.id} />
                </div> : null}

                <div className="requestdiv"><strong>Request:</strong> {listing?.request}</div>

                {listing?.Item?.image ? <img className='listingimagemodal' src={listing?.Item?.image}></img> : <img className='listingimagemodal' src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}

                <div className="usernamebotmodal">Listed by: {listing?.User?.username}</div>
                <div className="requestdiv bottom">
                    <h3 className="h3listingmodal">Comments</h3>
                    {listing.Comments.map(comment => {
                        return (
                            <div key={comment.id} className="eachcomment">
                                <div className="usernamecomment">{comment.username}</div>
                                <div className="contentcomment">{comment.content}</div>
                            </div>
                        )
                    })}
                </div>
                <form onSubmit={onSubmit} className="commentform">
                    <input value={content} onChange={(e) => {
                        setContent(e.target.value)
                    }} className="commentinput"></input>
                    <button className="commententer">Enter</button>
                </form>

            </div>
        </BackDrop>
    )
}

export default ListingModal
