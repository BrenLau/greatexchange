import { csrfFetch } from "./csrf"

const getMessage = 'messages/get'
const sendMessage = 'messages/send'

const getMessageAction = ({ messages, userId }) => ({
    type: getMessage,
    payload: { messages, userId }
})

const sendMessageAction = (message) => ({
    type: sendMessage,
    payload: message
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
}



const initialState = {};

export default function reducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case getMessage:
            if (!action.payload) return newState
            const { userId } = action.payload
            console.log(action.payload.messages)
            action.payload.messages.forEach(message => {

                const setId = message.senderId == userId ? message.receiverId : message.senderId
                if (!newState[setId]) {
                    newState[setId] = []
                }
                newState[setId].push(message)

            })

            return newState

        default:
            return state;
    }
}
