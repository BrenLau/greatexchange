import "./backdrop.css"

const BackDrop = ({ children, onClick }) => {
    //onClick to close modal
    return (
        <div onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClick()
        }} id='backdrop'>{children}</div>
    )
}
export default BackDrop
