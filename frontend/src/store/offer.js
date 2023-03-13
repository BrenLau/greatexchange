import { csrfFetch } from './csrf';

// constants
const MAKE_OFFER = 'offer/MAKE_OFFER'
const DELETE_OFFER = 'offer/DELETE_OFFER'


const makeAnOffer = (offerId) => ({
    type: MAKE_OFFER,
    payload: offerId
})

const delAnOffer = (offer) => ({
    type: DELETE_OFFER
})

export const deleteOfferThunk = ({ offerId }) => async (dispatch) => {

    const res = await csrfFetch(`/api/offers/${offerId}`, {
        method: 'DELETE'
    })
    const offer = await res.json()
    dispatch(delAnOffer(offerId))
    return offer
}

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
        case DELETE_OFFER:
            newState = { ...state }
            delete newState[action.orderId]
            return newState
        default:
            return state;
    }
}
