import {
  CLEAR_AUTH_ERROR,
  SIGN_OUT,
  GET_USERFAILURE,
  GET_USERREQUEST,
  GET_USERSUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./actionType";

const initialState = {
  isLoading: false,
  user: null,
  searchUser: [],
  error: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
    case GET_USERREQUEST:
    case SEARCH_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case GET_USERSUCCESS:
      return { ...state, user: payload, isLoading: false, error: null };
    case SEARCH_USER_SUCCESS:
      return { ...state, searchUser: payload, isLoading: false, error: null };
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
    case GET_USERFAILURE:
    case SEARCH_USER_FAILURE:
    case UPDATE_USER_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case CLEAR_AUTH_ERROR:
      return { ...state, isLoading: false, error: null };
    case SIGN_OUT:
      return {
        ...state,
        isLoading: false,
        user: null,
        searchUser: [],
        error: null,
      };
    default:
      return state;
  }
};
