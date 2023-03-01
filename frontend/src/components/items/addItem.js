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
            setName('')
            setImage(null)
        })
        return
    }

    return (
        <BackDrop onClick={onClick}>
            <form className='itemform' onSubmit={onSubmit} onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}>
                <label>Item name</label>
                <input value={name} onChange={(e) => {
                    e.preventDefault()
                    setName(e.target.value)
                }} placeholder="item name"></input>
                <label>Image</label>
                <input onClick={(e) => {
                    e.stopPropagation()
                }} onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setImage(file)
                }} type='file' ></input>
                <button onClick={(e) => {
                    e.stopPropagation()
                }}>Submit</button>
            </form>
        </BackDrop>

    )
}



export default AddItem
