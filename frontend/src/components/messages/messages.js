import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { getMessagesThunk, sendMessageThunk } from "../../store/messages"

const Messages = ({ messageId, setMessageId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const messages = useSelector(state => state.messages)
    console.log(messages)
    const [content, setContent] = useState('')
    const onContentChange = (e) => {
        setContent(e.target.value)

    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (content.trim().length > 0) {
            await dispatch(sendMessageThunk({ userId: user.id, messageId, content }))
        }
    }

    useEffect(() => {
        dispatch(getMessagesThunk({ userId: user?.id }))
    }, [dispatch, user])
    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <input value={content} onChange={onContentChange}></input>
                    <button>Submit</button>
                </form>
            </div>
            hello
        </div>
    )
}

export default Messages
