import {
  CLEAR_USER_ERROR,
  FIND_REQ_USER_FAILURE,
  FIND_REQ_USER_REQUEST,
  FIND_REQ_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./actionType";

const initialState = {
  user: null,
  searchUsers: [],
  isLoading: false,
  error: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
    case FIND_REQ_USER_REQUEST:
    case SEARCH_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case FIND_REQ_USER_SUCCESS:
      return { ...state, user: payload, isLoading: false, error: null };
    case SEARCH_USER_SUCCESS:
      return { ...state, searchUsers: payload, isLoading: false, error: null };
    case UPDATE_USER_SUCCESS:
      if (payload.fullName) {
        return {
          ...state,
          user: {
            ...state.user,
            fullName: payload.fullName,
            isLoading: false,
            error: null,
          },
        };
      } else if (payload.profilePicture) {
        return {
          ...state,
          user: {
            ...state.user,
            profilePicture: payload.profilePicture,
            isLoading: false,
            error: null,
          },
        };
      } else {
        return { ...state, isLoading: false, error: null };
      }
    case SIGN_UP_FAILURE:
    case SIGN_IN_FAILURE:
    case FIND_REQ_USER_FAILURE:
    case SEARCH_USER_FAILURE:
    case UPDATE_USER_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case CLEAR_USER_ERROR:
      return { ...state, error: null };
    case SIGN_OUT:
      return {
        ...state,
        isLoading: false,
        user: null,
        searchUsers: [],
        error: null,
      };
    default:
      return state;
  }
};
