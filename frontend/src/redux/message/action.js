import axios from "axios";

import {
  deleteMessageFromServer,
  sendMessageToServer,
} from "../../utils/websocket";
import {
  CREATE_NEW_MESSAGE_FAILURE,
  CREATE_NEW_MESSAGE_REQUEST,
  CREATE_NEW_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  GET_ALL_MESSAGES_FAILURE,
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_SUCCESS,
} from "./actionType";

export const createMessage =
  ({ reqData, currentChat }) =>
  async (dispatch) => {
    dispatch({ type: CREATE_NEW_MESSAGE_REQUEST });
    try {
      const { data } = await axios.post(`/messages`, reqData);
      sendMessageToServer(data, currentChat);
      dispatch({ type: CREATE_NEW_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_NEW_MESSAGE_FAILURE,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getAllMessages = (reqData) => async (dispatch) => {
  dispatch({ type: GET_ALL_MESSAGES_REQUEST });
  try {
    const { data } = await axios.get(`/messages/chat/${reqData.chatId}`);
    dispatch({ type: GET_ALL_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_MESSAGES_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteMessage =
  ({ currentChat, id }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_MESSAGE_REQUEST });
    try {
      const { data } = await axios.delete(`/messages/${id}`);
      if (data.status) {
        dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: id });
        deleteMessageFromServer(currentChat, id);
      }
    } catch (error) {
      dispatch({
        type: DELETE_MESSAGE_FAILURE,
        payload: error?.response?.data?.message,
      });
    }
  };
