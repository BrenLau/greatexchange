import AddItem from "./addItem";
import { useState } from "react";
import './yourItems.css'

const AddItemButton = ({ newClass }) => {
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);

    const addItemClose = () => setAddItemModalOpen(false);
    const addItemOpen = () => setAddItemModalOpen(true);
    return (
        <>
            <button className={!newClass ? 'navlinknav' : newClass} onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                addItemOpen()
            }}>Add Item</button>
            {addItemModalOpen ? <AddItem onClick={addItemClose}></AddItem> : null}
        </>
    )
}

export default AddItemButton
