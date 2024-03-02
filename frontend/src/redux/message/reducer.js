import {
  CLEAR_MESSAGE_ERROR,
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

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const messageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_NEW_MESSAGE_REQUEST:
    case GET_ALL_MESSAGES_REQUEST:
    case DELETE_MESSAGE_REQUEST:
      return { ...state, isLoading: true, error: null };

    case CREATE_NEW_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, payload],
        isLoading: false,
        error: null,
      };
    case GET_ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload,
        isLoading: false,
        error: null,
      };
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.filter((message) => message.id !== payload),
        isLoading: false,
        error: null,
      };

    case CREATE_NEW_MESSAGE_FAILURE:
    case GET_ALL_MESSAGES_FAILURE:
    case DELETE_MESSAGE_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case CLEAR_MESSAGE_ERROR:
      return { ...state, isLoading: false, error: null };
    default:
      return state;
  }
};
