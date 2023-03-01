import { getListingsThunk } from "../../store/listing"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const Listings = () => {
    const dispatch = useDispatch()
    const listings = useSelector(state => state.listings)
    console.log(listings)
    useEffect(() => {
        dispatch(getListingsThunk())
    }, [dispatch])
    return (
        Object.values(listings).length > 0 ? <ul>
            {Object.values(listings).map(listing => {
                return (
                    <li>
                        <div>{listing?.Item?.name}</div>
                        <div>Requesting: {listing.request}</div>
                        {listing?.Item?.image ? <img src={listing?.Item?.image}></img> : <img src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}

                    </li>
                )
            })}
        </ul> : null
    )
}

export default Listings
