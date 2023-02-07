import { csrfFetch } from './csrf';

// constants
const ADD_ITEM = 'items/addItem';
const GET_ITEMS = 'items/getitems'

const addaItem = (items) => ({
    type: ADD_ITEM,
    payload: items
});
const getTheItems = (items) => ({
    type: GET_ITEMS,
    payload: items
})

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
    dispatch(addaItem(item))

    return item
}

export const getItemsThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/items/user/${userId}`)
    const items = await res.json()
    dispatch(getTheItems(items.items))
    return
}

export default function reducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case ADD_ITEM:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState;
        case GET_ITEMS:
            newState = { ...state }
            action.payload.forEach(item => {
                newState[item.id] = item
            })

            return newState

        default:
            return state;
    }
}
