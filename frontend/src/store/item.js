import { csrfFetch } from './csrf';

// constants
const ADD_ITEM = 'items/addItem';


const addaItem = (items) => ({
    type: ADD_ITEM,
    payload: items
});

const initialState = {};

export const addItemThunk = (payload) => async (dispatch) => {
    const { name, file } = payload
    const formData = new FormData()

    formData.append("name", name)
    formData.append("file", file)

    const res = await csrfFetch(`/api/items`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body:
            formData
    })
    const item = await res.json()
    console.log(item)
    dispatch(addaItem(item))

    return item
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            let newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState

        default:
            return state;
    }
}
