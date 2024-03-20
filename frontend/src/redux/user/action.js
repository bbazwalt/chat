import axios from "axios";
import { API_BASE_URL, AUTH_API_BASE_URL } from "../../config/apiConfig";
import {
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

export const signUp = (reqData, authSignIn) => async (dispatch) => {
  dispatch({ type: SIGN_UP_REQUEST });
  try {
    axios.defaults.baseURL = AUTH_API_BASE_URL;
    const { data } = await axios.post("/signup", reqData);
    if (data.token && authSignIn) {
      authSignIn(data.token);
    }
    dispatch({ type: SIGN_UP_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAILURE,
      payload: error?.response?.data?.message,
    });
  } finally {
    axios.defaults.baseURL = API_BASE_URL;
  }
};

export const signIn = (reqData, authSignIn) => async (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });

  try {
    axios.defaults.baseURL = AUTH_API_BASE_URL;
    const { data } = await axios.post("/signin", reqData);
    if (data.token && authSignIn) {
      authSignIn(data.token);
    }
    dispatch({ type: SIGN_IN_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({
      type: SIGN_IN_FAILURE,
      payload: error?.response?.data?.message,
    });
  } finally {
    axios.defaults.baseURL = API_BASE_URL;
  }
};

export const findReqUser = (authSignOut) => async (dispatch) => {
  dispatch({ type: FIND_REQ_USER_REQUEST });
  try {
    const { data } = await axios.get("/users/profile");
    dispatch({ type: FIND_REQ_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_REQ_USER_FAILURE,
      payload: error?.response?.data?.message,
    });
    dispatch(signOut(authSignOut));
  }
};

export const searchUsers = (reqData) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await axios.get(`/users/search?name=${reqData.keyword}`);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEARCH_USER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const updateUser = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    await axios.put("/users/profile", reqData);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: reqData });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const signOut = (authSignOut) => async (dispatch) => {
  if (authSignOut) authSignOut();
  dispatch({ type: SIGN_OUT, payload: null });
};
