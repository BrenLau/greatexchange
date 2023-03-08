import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BackDrop from "../modal/backdrop"
import './offerform.css'


const Offers = ({ offers }) => {
    const dispatch = useDispatch()
    const [openOffers, setOpenOffers] = useState(false)


    return (
        <>
            <button onClick={(e) => {
                setOpenOffers(true)
            }}>Offers</button>

            {openOffers ? <BackDrop onClick={setOpenOffers}>
                <ul className="offersul">

                </ul>
            </BackDrop> : null}
        </>
    )

}

export default Offers
