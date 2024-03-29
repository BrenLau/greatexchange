import { getListingsThunk } from "../../store/listing"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import DeleteListing from "./DeleteListing"
import EditListing from "./EditListing"
import OfferForm from "../offers/OfferForm"
import Offers from "../offers/Offers"
import ListingModal from "./ListingModal"
import { useNavigate } from 'react-router-dom'

const Listings = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const listings = useSelector(state => state.listings)
    const user = useSelector(state => state.session?.user)

    const [listingModal, setListingModal] = useState(false)

    useEffect(() => {
        dispatch(getListingsThunk())
    }, [dispatch])
    return (
        Object.values(listings).length > 0 ? <ul className="listingul">
            <h2 className="listingtitle">Marketplace</h2>
            {Object.values(listings).reverse().map(listing => {
                return (

                    <li onClick={(e) => {
                        e.stopPropagation()
                        setListingModal(true)
                    }} key={listing?.id} className="listingli clickable">
                        {listingModal ? <ListingModal onClick={setListingModal} listing={listing} user={user} /> : null}

                        {listing?.userId !== user?.id ? <OfferForm user={user} listingId={listing?.id} userId={listing?.userId} /> : null}

                        <div className="infolisting">
                            <h3 className="h3listing">{listing?.Item?.name}</h3>
                            <div><strong>Request:</strong> {listing?.request}</div>
                        </div>
                        <div className="listingimg">
                            {user && (user?.id === listing?.userId) ? <div className="listbutdiv">
                                <DeleteListing listingId={listing?.id} />
                                <EditListing currentRequest={listing?.request} listingId={listing?.id} />
                            </div> : null}
                            {listing?.Item?.image ? <img className='listingimage' src={listing?.Item?.image}></img> : <img className='listingimage' src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}
                            <div className="usernamebot" onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/user/${listing?.User?.id}`, { replace: true })
                            }}>{listing?.User?.username}</div>
                        </div>
                        <Offers offers={listing.Offers} />
                    </li>
                )
            })}
        </ul> : <ul className="listingul">
            <h2 className="listingtitle">Marketplace</h2>
            <div className="nolistingsdiv">No Listings Yet</div>
        </ul>
    )
}

export default Listings
