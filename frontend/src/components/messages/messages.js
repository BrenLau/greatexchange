import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { getMessagesThunk, sendMessageThunk } from "../../store/messages"
import './messages.css'

const Messages = ({ messageId, setMessageId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const messagers = useSelector(state => state.messages)

    const sortByLast = (messages) => {
        return Object.values(messages).sort((a, b) => {
            if (b[b.length - 1].createdAt < a[a.length - 1].createdAt) {
                return -1
            } else {
                return 1
            }
        })
    }
    let messagesArray = sortByLast(messagers)

    // let messagesArray = Object.values(messagers).sort((a, b) => {
    //     if (Object.entries(messagers).length <= 1) {
    //         return
    //     }
    //     if (b[b.length - 1].createdAt < a[a.length - 1].createdAt) {
    //         return -1
    //     } else {
    //         return 1
    //     }
    // })
    console.log(messagers)
    console.log(messagesArray)



    const [content, setContent] = useState('')
    const onContentChange = (e) => {
        setContent(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (content.trim().length > 0) {
            await dispatch(sendMessageThunk({ userId: user.id, messageId, content })).then((e) => {
                messagesArray = sortByLast(messagers)
                if (messagesArray) {
                    return messagesArray
                }
                // Object.values(messagers).sort((a, b) => {
                //     if (b[b.length - 1].createdAt < a[a.length - 1].createdAt) {
                //         return 1
                //     } else {
                //         return -1
                //     }
                // })
            }).then((e) => {
                if (e) {
                    setContent('')
                    return
                }
            })
        }
    }

    useEffect(() => {
        dispatch(getMessagesThunk({ userId: user?.id }))
    }, [dispatch, user])
    return (
        <div className='messenger'>
            <div className="chatusernames">{
                messagesArray.map((messages) => {
                    if (messages.receiverId == user.id) {
                        return (
                            <div className='indivname' onClick={() => {
                                setMessageId(messages[0].senderId)
                            }}>{messages[0].sender.username}</div>
                        )
                    } else {
                        return (
                            <div className='indivname' onClick={() => {
                                setMessageId(messages[0].receiverId)
                            }}>{messages[0].receiver.username}</div>

                        )
                    }
                })
            }</div>
            <div className="messagebottom">
                <form onSubmit={onSubmit}>
                    <input disabled={!messageId} placeholder={!messageId ? 'Select a recipient' : null} value={content} onChange={onContentChange}></input>
                    <button disabled={!messageId} >Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Messages
