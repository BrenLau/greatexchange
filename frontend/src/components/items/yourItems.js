import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getItemsThunk, deleteItemThunk } from '../../store/item'
import './yourItems.css'

const YourItems = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const user = useSelector(state => state.session.user)
    const items = useSelector(state => state.items)
    useEffect(() => {
        dispatch(getItemsThunk({ userId: userId }))

    }, [dispatch])
    console.log(items)

    return (
        Object.values(items).length ? <div className='itemsstorage'>
            {Object.values(items).map(item => {
                return (
                    <div className='itemframe'>
                        <div>{item?.name}</div>

                        {item?.userId === user?.id ? < button onClick={async (e) => {
                            e.preventDefault()
                            await dispatch(deleteItemThunk(item.id))
                        }}> Delete</button> : null}

                        <img className='itemimage' src={item?.image}></img>
                    </div>
                )
            })}</div > : null

    )
}

export default YourItems
