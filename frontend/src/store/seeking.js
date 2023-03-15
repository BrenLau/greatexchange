import { csrfFetch } from './csrf';

// constants
const ADD_SEEKING = 'seeking/addseeking';
const GET_SEEKING = 'seeking/getseeking'
const DEL_SEEKING = 'seeking/delseeking'
const UPDATE_SEEKING = 'seeking/updateseeking'



const addaSeeking = (seeking) => ({
    type: ADD_SEEKING,
    payload: seeking
});
const getTheSeekings = (seekings) => ({
    type: GET_SEEKING,
    payload: seekings
})

const deleteTheSeeking = (seeking) => ({
    type: DEL_SEEKING,
    payload: seeking
})
const updateAnSeeking = (seeking) => ({
    type: UPDATE_SEEKING,
    payload: seeking
});

const initialState = {};

export const addSeekingThunk = (payload) => async (dispatch) => {
    const { name, summary, file } = payload
    const formData = new FormData()

    formData.append("name", name)
    formData.append("summary", summary)
    if (file) {
        formData.append("file", file)
    }

    const res = await csrfFetch(`/api/seekings`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body:
            formData
    })
    const item = await res.json()
    dispatch(addaSeeking(item))

    return item
}

export const getSeekingsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/seekings`)
    const seekings = await res.json()
    dispatch(getTheSeekings(seekings))
    return seekings
}

export const deleteSeekingThunk = ({ seekingId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/seekings/${seekingId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteTheSeeking(seekingId))
    }

    return
}

export const updateItemThunk = ({ itemId, payload }) => async (dispatch) => {
    const { name, file } = payload
    const formData = new FormData()
    if (name) {
        formData.append("name", name)
    }
    if (file) {
        formData.append("file", file)
    }

    const res = await csrfFetch(`/api/seekings/${itemId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData
    })
    if (res.ok) {
        const item = await res.json()
        dispatch(updateAnSeeking(item))
        return item
    }

}

export default function reducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case ADD_SEEKING:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState;
        case GET_SEEKING:
            action.payload.forEach(seeking => {
                newState[seeking.id] = seeking
            })
            return newState
        case DEL_SEEKING:
            newState = { ...state }
            delete newState[action.payload]
            return newState
        case UPDATE_SEEKING:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState

        default:
            return state;
    }
}
