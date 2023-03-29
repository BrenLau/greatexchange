import { csrfFetch } from "./csrf"

const getMessage = 'messages/get'

const getMessageAction = (messages) => ({
    type: getMessage,
    payload: messages
})

export const getMessagesThunk = ({ userId }) => async (dispatch) => {
    if (!userId) return
    const res = await csrfFetch(`/api/messages/user/${userId}`, {
        method: 'GET'
    })
    const messages = await res.json()
    if (messages) {
        console.log(messages)
        dispatch(getMessageAction(messages))
        return messages
    }
}




const initialState = {};

export default function reducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case getMessage:
            if (!action.payload) return newState
            action.payload.messages.forEach(message => {
                console.log(message)
            })

            return newState

        default:
            return state;
    }
}
