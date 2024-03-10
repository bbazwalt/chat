import { SIGN_OUT } from "../user/actionType";
import {
  CLEAR_CHAT_ERROR,
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

const initialState = {
  createdChat: null,
  createdGroup: null,
  chats: [],
  isLoading: false,
  error: null,
};

export const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_CHAT_REQUEST:
    case CREATE_GROUP_REQUEST:
    case GET_ALL_CHATS_REQUEST:
    case DELETE_CHAT_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        chats: [payload, ...state.chats],
        isLoading: false,
        error: null,
      };
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        chats: [payload, ...state.chats],
        isLoading: false,
        error: null,
      };
    case GET_ALL_CHATS_SUCCESS:
      return { ...state, chats: payload, isLoading: false, error: null };
    case DELETE_CHAT_SUCCESS:
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== payload),
        isLoading: false,
        error: null,
      };
    case CREATE_CHAT_FAILURE:
    case CREATE_GROUP_FAILURE:
    case GET_ALL_CHATS_FAILURE:
    case DELETE_CHAT_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case CLEAR_CHAT_ERROR:
      return { ...state, error: null };
    case SIGN_OUT:
      return {
        ...state,
        chats: [],
        createdGroup: null,
        createdChat: null,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
