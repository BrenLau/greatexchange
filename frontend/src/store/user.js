import { csrfFetch } from './csrf';

// constants
const GET_USER = 'user/getuser'

const getTheUser = (user) => ({
    type: GET_USER,
    payload: user
})



export const getUserThunk = ({ userId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`, {
        method: 'GET'
    })
    const user = await res.json()
    dispatch(getTheUser(user))
    return user
}


const initialState = {};



export default function reducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_USER:
            newState = { ...state }
            if (!action.payload) return newState
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}
