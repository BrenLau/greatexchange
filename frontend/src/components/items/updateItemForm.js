import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { updateItemThunk } from '../../store/item'
import './yourItems.css'
import BackDrop from '../modal/backdrop'

const UpdateItemsForm = ({ user, item, onClick }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState(item.name)
    const [image, setImage] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = { name, file: image }
        const res = await dispatch(updateItemThunk({ payload, itemId: item.id }))
        if (res) {
            onClick()
        }
        return
    }

    return (
        <BackDrop onClick={onClick}>
            <form className='itemform' onSubmit={onSubmit} onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
            }}>
                <h2 className="itemformh2">Edit Item</h2>

                <label className="itemformlabel">Item name
                    <input className='itemforminput' value={name} onChange={(e) => {
                        e.preventDefault()
                        setName(e.target.value)
                    }} placeholder="item name"></input>
                </label>
                <label className="itemformlabel">New Image?
                    <input className='itemforminput2' onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setImage(file)
                    }} type='file' onClick={(e) => {
                        e.stopPropagation()
                    }}></input>
                </label>
                <button className='additemsubmit' onClick={(e) => {
                    e.stopPropagation()
                }}>Submit</button>
            </form>
        </BackDrop>
    )
}

export default UpdateItemsForm
