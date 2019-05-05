import Cookies from "js-cookie";

export const SET_CURRENT_PROFILE = "auth/SET_CURRENT_PROFILE";

const initialState = {
  currentProfile: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.profile
      };

    default:
      return state;
  }
};

export const getCurrentProfile = id => dispatch =>
  new Promise(resolve => {
    let profile;
    let userFromCookie = Cookies.getJSON("user");

    profile = {
      ...userFromCookie
    };

    dispatch({
      type: SET_CURRENT_PROFILE,
      profile
    });

    resolve(profile);
  });

export const removeCurrentProfile = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: SET_CURRENT_PROFILE,
      profile: {}
    });

    resolve({});
  });
