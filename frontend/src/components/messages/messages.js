import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { getMessagesThunk } from "../../store/messages"

const Messages = ({ messageId, setMessageId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const messages = useSelector(state => state.messages)

    useEffect(() => {
        dispatch(getMessagesThunk({ userId: user?.id }))
    }, [dispatch, user])
    return (
        <div>
            hello
        </div>
    )
}

export default Messages
