import { addItemThunk } from "../../store/item"
import { useState } from 'react'
import { useDispatch } from 'react-redux'


function AddItem() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = { name, file: image }

        await dispatch(addItemThunk(formData)).then((e) => {
            e.preventDefault()
            setName('')
            setImage(null)
        })
        return
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Item name</label>
            <input value={name} onChange={(e) => {
                e.preventDefault()
                setName(e.target.value)
            }} placeholder="item name"></input>
            <label>Image</label>
            <input onChange={(e) => {
                const file = e.target.files[0];
                if (file) setImage(file)
            }} type='file'></input>
            <button>Submit</button>
        </form>
    )
}



export default AddItem
