
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";//this helps us to automatically scroll down when new messages arrive in in the chat
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {//we create a component function
  const { user } = ChatState();

  return (
    <ScrollableFeed>{/* this is the place where we use the react scrollabe feed we wrap it around all the messages  */}
      {messages && //here we put each message into a div to display we display the profile pic only if the same sender messages first time or last time and should not be the logged in user
        messages.map((m, i) => ( 
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),/* if the sender sends multiple messages then align everything to left but the last message of the sender alone to left most and if logged in user right */
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,/* this is to check if prev messages is also by same user if so we make them closer */
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
