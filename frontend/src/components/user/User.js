import YourItems from "../items/yourItems";
import UserData from "./UserData";

const User = ({ messageId, setMessageId }) => {
    return (
        <>
            <UserData messageId={messageId} setMessageId={setMessageId} />
            <YourItems />
        </>
    )
}

export default User
