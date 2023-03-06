import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getItemsThunk, deleteItemThunk } from '../../store/item'
import './yourItems.css'
import UpdateItemsForm from './updateItemForm'
import AddItemButton from './addItemButton'
import { getUserThunk } from '../../store/user'
import x from '../../x.png'
import edit from '../../edit.png'

const YourItems = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(getItemsThunk({ userId: userId }))
        dispatch(getUserThunk({ userId }))

    }, [dispatch, userId])
    const currentUser = useSelector(state => state.session.user)

    const users = useSelector(state => state.users)
    const user = users[userId]


    const items = useSelector(state => state.items)
    const [itemMode, setItemMode] = useState({})

    const [itemUpdateModalOpen, setItemUpdateModalOpen] = useState(false);


    const itemUpdateClose = () => setItemUpdateModalOpen(false);
    const itemUpdateOpen = () => setItemUpdateModalOpen(true);


    return (
        <>
            {Object.values(items).length ? <div className='itemsstorage'>
                {(currentUser && (user?.id === currentUser?.id)) ? <AddItemButton /> : null}
                <h1 className='h1foryouritems'>{user?.username}'s Inventory</h1>
                {Object.values(items).map(item => {
                    return (
                        <div key={item.id} className='itemframe'>
                            <div className='itemname'>{item?.name}</div>

                            <div id='abspos'>
                                <div className='buttonholdersitem'>

                                    {item?.userId === user?.id ? < img src={x} className='editdelbutt' onClick={async (e) => {
                                        e.preventDefault()
                                        await dispatch(deleteItemThunk(item.id))
                                    }}></img> : null}
                                    {item?.userId === user?.id ? < img src={edit} className='editdelbutt' onClick={async (e) => {
                                        e.preventDefault()
                                        setItemMode(item)
                                        itemUpdateOpen()
                                    }}></img> : null}
                                </div>
                            </div>

                            {item.image ? <img className='itemimage' src={item?.image}></img> : <img className='itemimage' src='https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'></img>}
                        </div>
                    )
                })}</div > : <div className='itemstorage'>                {(currentUser && (user?.id === currentUser?.id)) ? <AddItemButton /> : null}
            </div>}
            {itemUpdateModalOpen ? <UpdateItemsForm item={itemMode} onClick={itemUpdateClose}></UpdateItemsForm> : null}


        </>
    )
}

export default YourItems
