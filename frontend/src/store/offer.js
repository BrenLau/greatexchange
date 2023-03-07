import { csrfFetch } from './csrf';

// constants
const MAKE_OFFER = 'offer/MAKE_OFFER'

const makeAnOffer = (offer) => ({
    type: MAKE_OFFER,
    payload: offer
})



export const makeOfferThunk = ({ data, listingId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/offers/${listingId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const offer = await res.json()
    dispatch(makeAnOffer(offer))
    return offer
}


const initialState = {};



export default function reducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case MAKE_OFFER:
            newState = { ...state }
            if (!action.payload) return newState
            newState[action.payload.listingId] = action.payload
            return newState
        default:
            return state;
    }
}
