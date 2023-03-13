import { useState } from 'react'
import { useDispatch } from 'react-redux'
import BackDrop from '../modal/backdrop'
import { addSeekingThunk } from '../../store/seeking'
import './seeking.css'


function CreateSeeking() {
    const dispatch = useDispatch()

    const [seekingModal, setSeekingModal] = useState(false)

    const [name, setName] = useState('')
    const [summary, setSummary] = useState('')
    const [image, setImage] = useState(null)

    const onSubmit = async (e) => {
        const formData = { name, summary, file: image }

        await dispatch(addSeekingThunk(formData)).then(() => {
            setSeekingModal(false)
            setName('')
            setSummary('')
            setImage(null)
        })

        return
    }

    return (
        <>
            <button className='navlinknav' onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setSeekingModal(true)
            }}>Seek</button>
            {seekingModal ? <BackDrop onClick={setSeekingModal}>
                <form className='loginform seekingform' onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}>
                    <h2 className="logintitle">Seeking</h2>
                    <label >Item name
                        <input className='itemforminput' value={name} onChange={(e) => {
                            e.preventDefault()
                            setName(e.target.value)
                        }} placeholder="item name"></input>
                    </label>

                    <label >Summary
                        <input className='itemforminput' value={summary} onChange={(e) => {
                            e.preventDefault()
                            setSummary(e.target.value)
                        }} placeholder="item name"></input>
                    </label>

                    <label >Image
                        <input className='itemforminput2' onClick={(e) => {
                            e.stopPropagation()
                        }} onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) setImage(file)
                        }} type='file' ></input>
                    </label>
                    <button className='additemsubmit' onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        onSubmit()
                    }}>Submit</button>
                </form>
            </BackDrop> : null}
        </>

    )
}



export default CreateSeeking
