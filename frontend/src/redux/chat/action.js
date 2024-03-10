import axios from "axios";
import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_GROUP_FAILURE,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  DELETE_CHAT_FAILURE,
  DELETE_CHAT_REQUEST,
  DELETE_CHAT_SUCCESS,
  GET_ALL_CHATS_FAILURE,
  GET_ALL_CHATS_REQUEST,
  GET_ALL_CHATS_SUCCESS,
} from "./actionType";

export const createChat = (userId) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });
  try {
    const { data } = await axios.post(`/chats/single`, { userId });
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_CHAT_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const createGroup = (groupData) => async (dispatch) => {
  dispatch({ type: CREATE_GROUP_REQUEST });
  try {
    const { data } = await axios.post(`/chats/group`, groupData);
    dispatch({ type: CREATE_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_GROUP_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const findAllChats = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CHATS_REQUEST });
  try {
    const { data } = await axios.get(`/chats`);
    dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CHATS_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteChat = (chatId) => async (dispatch) => {
  dispatch({ type: DELETE_CHAT_REQUEST });
  try {
    await axios.delete(`/chats/${chatId}`);
    dispatch({ type: DELETE_CHAT_SUCCESS, payload: chatId });
  } catch (error) {
    dispatch({
      type: DELETE_CHAT_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
