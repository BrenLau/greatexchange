import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BackDrop from "../modal/backdrop"
import './offerform.css'


const Offers = ({ offers }) => {
    // const dispatch = useDispatch()
    const [openOffers, setOpenOffers] = useState(false)

    return (
        <>
            <button onClick={(e) => {
                setOpenOffers(true)
            }}>Offers</button>

            {openOffers ? <BackDrop onClick={setOpenOffers}>
                <ul onClick={(e) => {
                    e.stopPropagation()
                }} className="offersul">
                    {offers ? offers.map(offer => {
                        return (
                            <li key={offer.id} className="cashli">
                                <div>Offered by: {offer.User.username}</div>
                                <div>Cash: ${offer.cash}</div>

                                <div>Items Offered:</div>
                                <div className="offeritems">
                                    {offer.Items.length ? offer.Items.map(item => {
                                        return (
                                            <div className="eachofferitem">
                                                <div>{item.name}</div>
                                                <img className='itemimage5' src={item.image || 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'}></img>
                                            </div>
                                        )
                                    }) : <div className="nonediv">None</div>}
                                </div>

                            </li>
                        )
                    }) : null}
                </ul>
            </BackDrop> : null}
        </>
    )

}

export default Offers
