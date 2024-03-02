import { useEffect, useRef, useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

import {
  CLEAR_MESSAGE_ERROR,
  CREATE_NEW_MESSAGE_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
} from "../../redux/message/actionType";
import { connectWebSocket, subscribeToChat } from "../../utils/websocket";
import MessageCard from "../message/MessageCard";

import { createMessage } from "../../redux/message/action";
import ErrorSnackBar from "../snackBar/ErrorSnackBar";
import blankGroupPicture from "./../../assets/blank-group-picture.jpg";
import blankProfilePicture from "./../../assets/blank-profile-picture.png";
import EmptyItemsText from "../infoText/EmptyItemsText";

const RightSection = ({ currentChat }) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const messages = useSelector((store) => store.message.messages);
  const auth = useSelector((store) => store.auth);
  const error = useSelector((store) => store.message.error);

  const [content, setContent] = useState("");

  useEffect(() => {
    scrollIntoView();
  }, [messages]);

  useEffect(() => {
    connectWebSocket();
  }, []);

  const scrollIntoView = () => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (auth.user && currentChat) {
      subscribeToChat(currentChat, onMessageReceive);
    }
    scrollIntoView();
  }, [currentChat]);

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);

    if (receivedMessage?.type === "deletion") {
      const messageId = Number(receivedMessage.messageId);
      dispatch({
        type: DELETE_MESSAGE_SUCCESS,
        payload: messageId,
      });
    } else {
      if (receivedMessage?.user?.id !== auth?.user?.id)
        dispatch({
          type: CREATE_NEW_MESSAGE_SUCCESS,
          payload: receivedMessage,
        });
    }
    scrollIntoView();
  };

  const handleCreateNewMessage = () => {
    if (content.trim()) {
      const reqData = { chatId: currentChat.id, content: content };
      dispatch(createMessage({ reqData, currentChat }));
      setContent("");
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    currentChat && (
      <div className="relative w-[70%] bg-slate-200">
        <div className="header absolute top-0 z-10 w-full bg-[#f0f2f5]">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4 px-3 py-3">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  currentChat.group
                    ? currentChat.chatImage || blankGroupPicture
                    : auth.user.id !== currentChat.users[0].id
                      ? currentChat.users[0]?.profilePicture ||
                        blankProfilePicture
                      : currentChat.users[1]?.profilePicture ||
                        blankProfilePicture
                }
                alt={
                  currentChat.group
                    ? currentChat.chatName
                    : currentChat.users[0].fullName
                }
              />
              <p>
                {currentChat.group
                  ? currentChat.chatName
                  : auth.user?.id === currentChat.users[0].id
                    ? currentChat.users[1].fullName
                    : currentChat.users[0].fullName}
              </p>
            </div>
            <div className="flex items-center space-x-4 px-3 py-3"></div>
          </div>
        </div>
        <div className={` h-[36.75rem] overflow-y-scroll px-10`}>
          <div className="mt-20 flex flex-col justify-center space-y-1 py-2">
            {messages.length === 0 ? (
              <EmptyItemsText content={"messages"} />
            ) : (
              messages?.map((item, i) => (
                <MessageCard
                  key={i}
                  id={item.id}
                  currentChat={currentChat}
                  chatId={currentChat.id}
                  fullName={item.user.fullName}
                  isGroup={currentChat.group}
                  isReqUserMessage={item.user.id === auth.user.id}
                  content={item.content}
                  createdAt={item.createdAt}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="footer absolute bottom-0 w-full bg-[#f0f2f5] py-3 text-2xl">
          <div className="relative flex items-center justify-between px-5">
            <input
              className="w-[95%] rounded-md border-none bg-white py-2 pl-4 text-lg outline-none"
              type="text"
              onChange={(e) => {
                setContent(e.target.value.trimStart());
              }}
              placeholder="Type a message"
              value={content}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateNewMessage();
                }
              }}
            />
            <button onClick={handleCreateNewMessage}>
              <div className="p-2 hover:rounded-full hover:bg-gray-300">
                <PiPaperPlaneRightFill />
              </div>
            </button>
          </div>
        </div>
        {error && (
          <ErrorSnackBar error={error} dispatchType={CLEAR_MESSAGE_ERROR} />
        )}
      </div>
    )
  );
};

export default RightSection;
