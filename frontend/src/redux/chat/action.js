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
  GET_USERS_CHAT_FAILURE,
  GET_USERS_CHAT_REQUEST,
  GET_USERS_CHAT_SUCCESS,
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

export const getUsersChat = () => async (dispatch) => {
  dispatch({ type: GET_USERS_CHAT_REQUEST });
  try {
    const { data } = await axios.get(`/chats`);
    dispatch({ type: GET_USERS_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USERS_CHAT_FAILURE,
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
