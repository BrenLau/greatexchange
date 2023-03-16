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
            }} key={seeking?.id} className="seekmodal">

                <h3 className="h3seekmodal">{seeking?.name}</h3>
                <DeleteSeeking />

                <div className="seekmodalsummary"><strong>Seeking:</strong> {seeking?.summary}</div>

                {seeking?.image ? <img className='' src={seeking?.image}></img> : null}

                <div className="">Seeker: {seeking?.User?.username}</div>
                <div className="seekingcommentform">
                    <h3 className="h3listingmodalseek">Comments</h3>
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
