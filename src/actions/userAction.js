import ACTION_CONSTANTS from "../actions/constant";

export const setUserDetails = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.USER_DETAILS,
    payload: data,
  });
};

export const setUserLogout = (data) => (dispatch) => {
    dispatch({
      type: ACTION_CONSTANTS.USER_LOGOUT,
      payload: data,
    });
  };

export const setSignupStatus = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.USER_SIGNUP_STATUS,
    payload: data,
  });
};

export const setPhoneNumberVerificationStatus = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.USER_PHONE_NUMBER_VERIFY,
    payload: data,
  });
};

export const setUsersPhoneNumber = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.USER_PHONE_NUMBER,
    payload: data,
  });
};

export const setProfile = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.USER_PROFILE,
    payload: data,
  });
};

export const setProfilePicture = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.USER_PROFILE_PICTURE,
    payload: data,
  });
};

