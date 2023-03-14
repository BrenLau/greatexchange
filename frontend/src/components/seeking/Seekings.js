import CreateSeeking from "./CreateSeeking";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSeekingsThunk } from '../../store/seeking'
import DeleteSeeking from "./DeleteSeeking";
import SeekingModal from "./SeekingModal";

const Seeking = () => {
    const dispatch = useDispatch()
    const seekings = useSelector(state => state.seekings)
    const [seekingModal, setSeekingModal] = useState(false)

    useEffect(() => {
        dispatch(getSeekingsThunk())
    }, [dispatch])

    return (
        <>
            {seekingModal ? <SeekingModal seeking={seekings[seekingModal]} onClick={setSeekingModal} /> : null}
            <div className="allseekings">
                <div className="fullwidth22">
                    <h2 className="seekingtitle">Seeking</h2>
                </div>
                {!Object.values(seekings).length ? <div className="noseekingsdiv">No Seeking</div> : null}
                {Object.values(seekings).reverse().map((seeking) => {
                    return (
                        <div onClick={(e) => {
                            e.stopPropagation()
                            setSeekingModal(seeking.id)
                        }} className="eachseeking">
                            <DeleteSeeking seekingId={seeking.id} userId={seeking.userId} />
                            <div className="outsidedivseeking">Item Name: <div>{seeking.name}</div></div>
                            <div className="outsidedivseeking">Summary: <div>{seeking.summary}</div></div>
                            {seeking.image ? <img className='itemimage' src={seeking?.image}></img> : <img className='itemimage' src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}
                            <div className="outsidedivseeking">Seeker: <div>{seeking.User.username}</div></div>
                        </div>)
                })}
            </div>
        </>
    )
}

export default Seeking
