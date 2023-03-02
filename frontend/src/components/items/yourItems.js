import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getItemsThunk, deleteItemThunk } from '../../store/item'
import './yourItems.css'
import UpdateItemsForm from './updateItemForm'
import AddItemButton from './addItemButton'

const YourItems = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const user = useSelector(state => state.session.user)
    const items = useSelector(state => state.items)
    const [itemMode, setItemMode] = useState({})

    const [itemUpdateModalOpen, setItemUpdateModalOpen] = useState(false);


    const itemUpdateClose = () => setItemUpdateModalOpen(false);
    const itemUpdateOpen = () => setItemUpdateModalOpen(true);

    useEffect(() => {
        dispatch(getItemsThunk({ userId: userId }))

    }, [dispatch])

    return (
        <>
            {Object.values(items).length ? <div className='itemsstorage'>
                <AddItemButton />
                <h1 className='h1foryouritems'>Your Items</h1>
                {Object.values(items).map(item => {
                    return (
                        <div className='itemframe'>
                            <div>{item?.name}</div>
                            {item?.userId === user?.id ? < button onClick={async (e) => {
                                e.preventDefault()
                                await dispatch(deleteItemThunk(item.id))
                            }}> Delete</button> : null}
                            {item?.userId === user?.id ? < button onClick={async (e) => {
                                e.preventDefault()
                                setItemMode(item)
                                itemUpdateOpen()
                            }}> Edit</button> : null}
                            {item.image ? <img className='itemimage' src={item?.image}></img> : <img className='itemimage' src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}
                        </div>
                    )
                })}</div > : <AddItemButton />}
            {itemUpdateModalOpen ? <UpdateItemsForm item={itemMode} onClick={itemUpdateClose}></UpdateItemsForm> : null}


        </>
    )
}

export default YourItems
