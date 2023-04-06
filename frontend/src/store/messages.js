import { csrfFetch } from "./csrf"

const getMessage = 'messages/get'
const sendMessage = 'messages/send'

const getMessageAction = ({ messages, userId }) => ({
    type: getMessage,
    payload: { messages, userId }
})

const sendMessageAction = ({ message, userId }) => ({
    type: sendMessage,
    payload: { message, userId }
})

export const getMessagesThunk = ({ userId }) => async (dispatch) => {
    if (!userId) return
    const res = await csrfFetch(`/api/messages/user/${userId}`, {
        method: 'GET'
    })
    const messages = await res.json()
    if (messages) {
        dispatch(getMessageAction({ messages: messages.messages, userId }))
        return messages
    }
}

export const sendMessageThunk = ({ content, userId, messageId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/messages`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:
            JSON.stringify({
                content,
                senderId: userId,
                receiverId: messageId
            })
    })
    const message = await res.json()

    if (message) {
        dispatch(sendMessageAction({ message, userId }))
    }
}



const initialState = {};

export default function reducer(state = initialState, action) {
    let newState = {}
    let userId
    switch (action.type) {
        case getMessage:
            if (!action.payload) return newState
            userId = action.payload.userId
            action.payload.messages.forEach(message => {
                const setId = message.senderId === userId ? message.receiverId : message.senderId
                if (!newState[setId]) {
                    newState[setId] = []
                }
                newState[setId].push(message)
            })
            return newState
        case sendMessage:
            newState = { ...state }
            userId = action.payload.userId
            const setId = action.payload.message.senderId === userId ? action.payload.message.receiverId : action.payload.message.senderId
            if (!newState[setId]) {
                newState[setId] = []
            }
            const newMessages = [...newState[setId]]

            newMessages.push(action.payload.message)

            newState[setId] = newMessages
            return newState

        default:
            return state;
    }
}
