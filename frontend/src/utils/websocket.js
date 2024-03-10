import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { BASE_URL } from "../config/apiConfig";
let sock;
let stomp;

export const connectWebSocket = () => {
  sock = new SockJS(BASE_URL + "/ws");
  stomp = Stomp.over(sock);
  stomp.debug = () => {};
  stomp.connect({}, () => {}, onError);
};

export const onError = (error) => {
  console.error("Error in WebSocket", error);
};

export const subscribeToChat = (currentChat, onMessageReceive) => {
  stomp?.subscribe(`/user/${currentChat.id}/private`, onMessageReceive);
};

export const sendMessageToServer = (newMessage, currentChat) => {
  if (stomp && newMessage) {
    stomp.send(
      `/app/chat/${currentChat?.id.toString()}`,
      {},
      JSON.stringify(newMessage),
    );
  }
};

export const deleteMessageFromServer = (currentChat, messageId) => {
  if (stomp && messageId) {
    stomp.send(
      `/app/chat/${currentChat?.id.toString()}/delete/${messageId.toString()}`,
      {},
      JSON.stringify(messageId),
    );
  }
};
