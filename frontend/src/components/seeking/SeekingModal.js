import { useState } from "react";
import BackDrop from "../modal/backdrop";
import { csrfFetch } from "../../store/csrf";
import { getSeekingsThunk } from "../../store/seeking";
import { useDispatch } from "react-redux";
import DeleteSeeking from "./DeleteSeeking";

const SeekingModal = ({ seeking, user, onClick }) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    console.log(seeking)


    const onSubmit = async (e) => {
        e.preventDefault()
        if (content.trim().length == 0) {
            return
        }
        const data = { content, user, seekingId: seeking.id }
        await csrfFetch(`/api/comments`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(() => {
            dispatch(getSeekingsThunk())
        }).then(() => {
            setContent('')
        })
    }
    return (
        <BackDrop onClick={onClick}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} key={seeking?.id} className="">

                <h3 className="">{seeking?.Item?.name}</h3>
                <DeleteSeeking />

                <div className="requestdiv"><strong>Seeking:</strong> {seeking?.name}</div>

                {seeking?.image ? <img className='listingimagemodal' src={seeking?.image}></img> : <img className='listingimagemodal' src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}

                <div className="">Seeker: {seeking?.User?.username}</div>
                <div className="requestdiv bottom">
                    <h3 className="h3listingmodal">Comments</h3>
                    {seeking.Comments.map(comment => {
                        return (
                            <div className="eachcomment">
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

export default SeekingModal
