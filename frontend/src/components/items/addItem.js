import { addItemThunk } from "../../store/item"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './yourItems.css'
import BackDrop from '../modal/backdrop'


function AddItem({ onClick }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = { name, file: image }

        await dispatch(addItemThunk(formData)).then(() => {
            onClick()
        })

        return
    }

    return (
        <BackDrop onClick={onClick}>
            <form className='itemform' onSubmit={onSubmit} onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}>
                <h2 className="itemformh2">Add Item</h2>
                <label className="itemformlabel">Item name
                    <input className='itemforminput' value={name} onChange={(e) => {
                        e.preventDefault()
                        setName(e.target.value)
                    }} placeholder="item name"></input>
                </label>
                <label className="itemformlabel">Image
                    <input className='itemforminput2' onClick={(e) => {
                        e.stopPropagation()
                    }} onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setImage(file)
                    }} type='file' ></input>
                </label>
                <button className='additemsubmit' onClick={(e) => {
                    e.stopPropagation()
                }}>Submit</button>
            </form>
        </BackDrop>

    )
}



export default AddItem
