import { useContext,createContext,useState,useEffect, Children, use} from "react";
import {useNavigate} from "react-dom"

const ChatContext=createContext();
const ChatProvider=({Children})=>{
    const navigate=useNavigate();  
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();

    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if(!userInfo){
            navigate("/")
        }
    },[user,navigate])//so here whenever there is a change in the navigate which is just used for safety or whenevr there is modification or update in user object which is dynamically available as common to many pages we will call this useEffect
    
    return (
        <ChatContext.Provider value={{
            selectedChat,
            setSelectedChat,
            user,
            setUser,
            notification,
            setNotification,
            chats,setChats
        }}>
            {Children}
        </ChatContext.Provider>
    )
}

export const ChatState=()=>{
    return useContext(ChatContext)
}
export default ChatProvider

/*
The need of adding users in the dependacies list
🔁 useEffect([user]) – What exactly triggers it?
The useEffect(() => { ... }, [user]) hook runs whenever the user variable itself changes.

🧠 So what does “changes” mean?
It means that the reference or value of user must change.

✅ Triggers the effect:
js
Copy
Edit
setUser(newUser); // new object reference
❌ Does not trigger the effect:
js
Copy
Edit
localStorage.setItem("userInfo", JSON.stringify(updatedUser));
Updating localStorage alone does not cause user to change.

✅ Example: What will trigger useEffect([user])
js
Copy
Edit
// ChatContext.js or wherever context is set up
setUser(JSON.parse(localStorage.getItem("userInfo")));
If you call setUser(...) with a new value, then useEffect([user]) will run.

🔍 In your case: Why localStorage updates don’t matter on their own
js
Copy
Edit
localStorage.setItem("userInfo", JSON.stringify(updatedUser)); // NO EFFECT triggered
This won’t notify React or change the state, because:

React doesn’t watch localStorage

React only tracks state/prop changes

✅ How to make it trigger?
If you want the effect to run when user info is updated in localStorage, you must also update the user state/context like this:

js
Copy
Edit
const updatedUser = { ...user, name: "New Name" };
localStorage.setItem("userInfo", JSON.stringify(updatedUser));
setUser(updatedUser); // this triggers useEffect([user])
 */