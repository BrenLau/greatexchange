import CreateSeeking from "./CreateSeeking";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSeekingsThunk } from '../../store/seeking'

const Seeking = () => {
    const dispatch = useDispatch()
    const seekings = useSelector(state => state.seekings)

    useEffect(() => {
        dispatch(getSeekingsThunk())
    }, [dispatch])

    return (
        <>
            <CreateSeeking />
            <div className="allseekings">
                {Object.values(seekings).reverse().map((seeking) => {
                    return (
                        <div className="eachseeking">
                            <div>Seeker: {seeking.User.username}</div>
                            <div>Item Name: {seeking.name}</div>
                            <div>Summary: {seeking.summary}</div>
                            {seeking.image ? <img className='itemimage' src={seeking?.image}></img> : <img className='itemimage' src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}
                        </div>)
                })}
            </div>
        </>
    )
}

export default Seeking
