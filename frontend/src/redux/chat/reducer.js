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
  GET_USERS_CHAT_FAILURE,
  GET_USERS_CHAT_REQUEST,
  GET_USERS_CHAT_SUCCESS,
} from "./actionType";

const initialState = {
  chats: [],
  createdGroup: null,
  createdChat: null,
  error: null,
  isLoading: false,
};

export const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_CHAT_REQUEST:
    case CREATE_GROUP_REQUEST:
    case GET_USERS_CHAT_REQUEST:
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
    case GET_USERS_CHAT_SUCCESS:
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
    case GET_USERS_CHAT_FAILURE:
    case DELETE_CHAT_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case CLEAR_CHAT_ERROR:
      return { ...state, isLoading: false, error: null };
    default:
      return state;
  }
};
