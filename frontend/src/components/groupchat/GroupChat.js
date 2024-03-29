import { useEffect, useRef, useState } from "react"
import { csrfFetch } from "../../store/csrf"
import './groupchat.css'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"


const GroupChat = ({ socket, closeChat }) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const [message, setMessage] = useState('')
    const [groupChat, setGroupChat] = useState([])
    const [update, setUpdate] = useState(false)
    const bottomRef = useRef(null);

    const onClick = (mess) => {
        navigate(`/user/${mess.User.id}`, { replace: true })
    }

    useEffect(() => {
        csrfFetch('/api/groupmessages').then(async (messages) => {
            return await messages.json()
        }).then(({ messages }) => {
            setGroupChat(messages)
        }).then(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'auto' });

        })


    }, [])



    socket.on('receive-message', message => {
        const newGroup = [...groupChat]
        newGroup.push(message)
        setGroupChat(newGroup)
        setUpdate(!update)
    })

    const onSubmit = async (e) => {
        e.preventDefault()
        await csrfFetch('/api/groupmessages', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:
                JSON.stringify({
                    message
                })

        }).then((message1) => {
            return message1.json()
        }).then(message2 => {
            socket.emit("send-message", message2)
        })
        await setMessage('')

    }
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [update])

    return (
        <div className="groupchatdiv">
            <button className="groupchatclose" onClick={(e) => {
                e.preventDefault()
                closeChat(false)
            }}>X</button>
            <h2 className="h2pubchat">Public Chat</h2>
            <div className="groupchatmessages">
                {groupChat.map(mess => {
                    return (
                        <div key={mess?.id} className="messageholder">
                            {user?.id == mess?.User?.id ? <div className='groupchatmessage rightusermess' key={mess?.id}>{mess?.content}</div> : <div className='groupchatmessage' key={mess?.id}>{mess?.content}</div>}
                            {user?.id == mess?.User?.id ? <div className="groupchatuser wronguser" onClick={(e) => onClick(mess)}>{mess?.User?.username}</div> : <div className="groupchatuser" onClick={(e) => onClick(mess)}>{mess?.User?.username}</div>}
                        </div>
                    )
                })}
                <div ref={bottomRef} />
            </div>
            <form className='groupchatform' onSubmit={onSubmit}>
                <input disabled={!user ? true : false} className="groupchatinput" placeholder={!user ? 'Must be logged in to chat' : null} value={message} onChange={(e) => {
                    setMessage(e.target.value)
                }}></input>
                <button disabled={!user ? true : false} className="groupchatbutton">Enter</button>
            </form>
        </div>
    )
}

export default GroupChat
