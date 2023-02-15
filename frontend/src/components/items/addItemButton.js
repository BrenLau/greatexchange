import AddItem from "./addItem";
import { useState } from "react";
import './yourItems.css'

const AddItemButton = () => {
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);

    const addItemClose = () => setAddItemModalOpen(false);
    const addItemOpen = () => setAddItemModalOpen(true);
    return (
        <>
            <button className='additembutton' onClick={addItemOpen}>Add Item</button>
            {addItemModalOpen ? <AddItem onClick={addItemClose}></AddItem> : null}
        </>
    )
}

export default AddItemButton
