import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessagesThunk, receiveMessageThunk, sendMessageThunk } from "../../store/messages"
import './messages.css'

const Messages = ({ messageId, setMessageId, socket }) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const messagers = useSelector(state => state.messages)
    const bottomRef = useRef(null);



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


    const [content, setContent] = useState('')
    const onContentChange = (e) => {
        setContent(e.target.value)
    }

    socket.on('receive-pm', async (message) => {
        console.log(message)
        if (message.receiverId === user?.id) {

            await dispatch(receiveMessageThunk({ message, userId: user.id })).then((e) => {
                messagesArray = sortByLast(messagers)


            })

        }
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        if (content.trim().length > 0) {
            await dispatch(sendMessageThunk({ userId: user.id, messageId, content })).then((e) => {
                messagesArray = sortByLast(messagers)
                if (messagesArray) {
                    return e
                }
            }).then((e) => {
                if (e) {
                    setContent('')
                    socket.emit("send-pm", e)
                    return
                }
            })
        }
    }

    useEffect(() => {
        dispatch(getMessagesThunk({ userId: user?.id }))
    }, [dispatch, user])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messageId, dispatch, messagers])

    return (
        user ? <div className='messenger'>
            <div className="chatusernames">{
                messagesArray.map((messages) => {
                    if (messages[0].receiverId === user.id) {
                        return (
                            <div className='indivname' id={messageId === messages[0].sender.id ? 'selected' : null} onClick={() => {
                                setMessageId(messages[0].senderId)
                            }}>{messages[0].sender.username}</div>
                        )
                    } else {
                        return (
                            <div className='indivname' id={messageId === messages[0].receiver.id ? 'selected' : null} onClick={() => {
                                setMessageId(messages[0].receiverId)
                            }}>{messages[0].receiver.username}</div>

                        )
                    }
                })
            }</div>
            {messagers[messageId] ? <div className="chatarea">{messagers[messageId].map(message => {
                return (
                    <div className="eachmessageprivate">
                        <div>{message.content}</div>
                        <div>{message.sender.username}</div>
                    </div>
                )
            })}
                <div ref={bottomRef} />
                <div className="messagebottom">
                    <form className='messageformbox' onSubmit={onSubmit}>
                        <input className='messageformboxinput' disabled={!messageId} placeholder={!messageId ? 'Select a recipient' : null} value={content} onChange={onContentChange}></input>
                        <button className="sendmessagebut" disabled={!messageId} >Submit</button>
                    </form>
                </div>
            </div> : <div className="chatarea">Who are you chatting with?            <div className="messagebottom">
                <form className='messageformbox' onSubmit={onSubmit}>
                    <input className='messageformboxinput' disabled={!messageId} placeholder={!messageId ? 'Select a recipient' : null} value={content} onChange={onContentChange}></input>
                    <button className='sendmessagebut' disabled={!messageId} >Submit</button>
                </form>
            </div></div>}


        </div> : null
    )
}

export default Messages
