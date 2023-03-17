import { useEffect, useState } from "react"
import { csrfFetch } from "../../store/csrf"
import './groupchat.css'

const GroupChat = ({ socket }) => {
    const [message, setMessage] = useState('')
    const [groupChat, setGroupChat] = useState([])

    useEffect(() => {
        csrfFetch('/api/groupmessages').then(async (messages) => {
            return await messages.json()
        }).then(({ messages }) => {
            setGroupChat(messages)
        })


    }, [groupChat])
    socket.on('connect', () => {
        console.log('you connected with id', socket.id)
    })
    socket.on('receive-message', message => {
        const newGroup = [...groupChat]
        newGroup.push(message)
        setGroupChat(newGroup)
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

    return (
        <div className="groupchatdiv">
            <h2 className="h2pubchat">Public Chat</h2>
            <div className="groupchatmessages">
                {groupChat.map(mess => {
                    return (
                        <div>{mess.content}</div>
                    )
                })}
            </div>
            <form className='groupchatinput' onSubmit={onSubmit}>
                <input value={message} onChange={(e) => {
                    setMessage(e.target.value)
                }}></input>
                <button>Enter</button>
            </form>
        </div>
    )
}

export default GroupChat
