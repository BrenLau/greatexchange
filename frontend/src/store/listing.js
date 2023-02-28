import { csrfFetch } from './csrf';

// constants
const ADD_LISTING = 'listing/LISTItem';
const GET_LISTING = 'listing/getlisting'
const DEL_LISTING = 'listing/dellisting'
const UPDATE_LISTING = 'listing/updatelisting'



const addaListing = (listing) => ({
    type: ADD_LISTING,
    payload: listing
});
const getTheListing = (listing) => ({
    type: GET_LISTING,
    payload: listing
})

const deleteTheListing = (listingId) => ({
    type: DEL_LISTING,
    payload: listingId
})
const updateAnListing = (listing) => ({
    type: UPDATE_LISTING,
    payload: listing
});

export const addListingThunk = ({ request, itemId }) => async (dispatch) => {

    const res = await csrfFetch(`/api/items`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:
            JSON.stringify({
                request,
                itemId
            })
    })
    const listing = await res.json()
    dispatch(addaListing(listing))

    return listing
}


const initialState = {};



export default function reducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case ADD_LISTING:
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState;


        default:
            return state;
    }
}
