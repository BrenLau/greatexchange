import { csrfFetch } from './csrf';

// constants
const GET_USER = 'user/getuser'
const GET_USERS = 'user/getusers'
const EDIT_USER = 'user/edituser'

const getTheUser = (user) => ({
    type: GET_USER,
    payload: user
})

const getAllUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

const editAUser = (user) => ({
    type: EDIT_USER,
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

export const getUsersThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/users`)
    const users = await res.json()
    dispatch(getAllUsers(users))
}

export const editUserThunk = ({ userId, summary, image }) => async (dispatch) => {
    const formData = new FormData()
    if (!summary && !image) return
    if (image) {
        formData.append('image', image)
    }
    if (summary) {
        formData.append('summary', summary)
    }

    const res = await csrfFetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body:
            formData
    },
    )
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
        case GET_USERS:
            action.payload.forEach(user => {
                newState[user.id] = user
            })
            return newState
        case EDIT_USER:
            return newState
        default:
            return state;
    }
}
