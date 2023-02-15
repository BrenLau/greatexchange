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

    const [itemUpdateModalOpen, setItemUpdateModalOpen] = useState(false);

    const itemUpdateClose = () => setItemUpdateModalOpen(false);
    const itemUpdateOpen = () => setItemUpdateModalOpen(true);

    useEffect(() => {
        dispatch(getItemsThunk({ userId: userId }))

    }, [dispatch])
    console.log(items)

    return (
        Object.values(items).length ? <div className='itemsstorage'>
            <AddItemButton />
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
                            itemUpdateOpen()
                        }}> Edit</button> : null}
                        <img className='itemimage' src={item?.image}></img>
                        {itemUpdateModalOpen ? <UpdateItemsForm item={item} onClick={itemUpdateClose}></UpdateItemsForm> : null}
                    </div>
                )
            })}</div > : null

    )
}

export default YourItems
