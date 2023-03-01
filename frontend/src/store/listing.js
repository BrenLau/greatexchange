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
const getTheListing = (listings) => ({
    type: GET_LISTING,
    payload: listings
})

const deleteTheListing = (listingId) => ({
    type: DEL_LISTING,
    payload: listingId
})
const updateAnListing = (listing) => ({
    type: UPDATE_LISTING,
    payload: listing
});

export const getListingsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/listings`, {
        method: 'GET'
    })
    const listings = await res.json()
    dispatch(getTheListing(listings))
}

export const addListingThunk = ({ request, itemId }) => async (dispatch) => {

    const res = await csrfFetch(`/api/listings`, {
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
            newState[action.payload.listing.id] = action.payload.listing
            return newState;
        case GET_LISTING:
            action.payload.listings.forEach(list => {
                newState[list.id] = list
            })
            return newState
        default:
            return state;
    }
}
