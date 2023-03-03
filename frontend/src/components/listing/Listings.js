import { getListingsThunk } from "../../store/listing"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import DeleteListing from "./DeleteListing"
import EditListing from "./EditListing"

const Listings = () => {
    const dispatch = useDispatch()
    const listings = useSelector(state => state.listings)

    useEffect(() => {
        dispatch(getListingsThunk())
    }, [dispatch])
    return (
        Object.values(listings).length > 0 ? <ul className="listingul">
            {Object.values(listings).map(listing => {
                return (
                    <li className="listingli">
                        <div className="divforeditanddel">
                            <div>
                                <DeleteListing listingId={listing.id} />
                                <EditListing currentRequest={listing.request} listingId={listing.id} />
                            </div>
                            <div className="usernamebot">{listing?.User?.username}</div>
                        </div>
                        <div className="infolisting">
                            <h3 className="h3listing">{listing?.Item?.name}</h3>
                            <div>Requesting: <br /><br />{listing.request}</div>
                        </div>
                        <div className="listingimg">

                            {listing?.Item?.image ? <img className='listingimage' src={listing?.Item?.image}></img> : <img className='listingimage' src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}
                        </div>

                    </li>
                )
            })}
        </ul> : null
    )
}

export default Listings
