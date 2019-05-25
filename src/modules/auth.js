
import axios from "axios";

export const AUTHENTICATE = "auth/AUTHENTICATE";
export const SET_CURRENT_USER = "auth/SET_CURRENT_USER";

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.authenticated
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      };

    default:
      return state;
  }
};

export const setCurrentUser = user => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: SET_CURRENT_USER,
      user
    });

    localStorage.setItem("user", JSON.stringify(user))

    dispatch({
      type: AUTHENTICATE,
      authenticated: true
    });

    resolve(user);
  });

export const establishCurrentUser = () => dispatch =>
  new Promise(resolve => {
    let userFromCookie = JSON.parse(localStorage.getItem("user"));

    if (userFromCookie) {
      dispatch(setCurrentUser(userFromCookie));
      resolve(userFromCookie);
    } else {
      resolve({});
    }
  });

export const loginUser = (email, password) => dispatch => {
  return axios
    .get("https://967a6564.ngrok.io/admin/user/login/" + email + "/" + password)
    .then(res => {
      dispatch(setCurrentUser(res.data));
    });
};

export const logoutUser = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: AUTHENTICATE,
      authenticated: false
    });

    localStorage.clear();

    dispatch({
      type: SET_CURRENT_USER,
      user: {}
    });

    localStorage.removeItem("user");
    resolve({});
  });
