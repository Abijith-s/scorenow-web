import ACTION_CONSTANTS from "../actions/constant";

// const userData = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : {};

const initialState = {
  user: {},
  userProfile:{},
  signupStatus: null,
  phoneNumberVerfyStatus:null,
  phoneNumber:null,
  profilePicture:""
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.USER_DETAILS:
      return { ...state, user: action.payload };
    case ACTION_CONSTANTS.USER_SIGNUP_STATUS:
      return { ...state, signupStatus: action.payload }
    case ACTION_CONSTANTS.USER_LOGOUT:
        return{...state, user:{}}
    case ACTION_CONSTANTS.USER_PHONE_NUMBER_VERIFY:
        return{...state, phoneNumberVerfyStatus:action.payload}
    case ACTION_CONSTANTS.USER_PHONE_NUMBER:
        return{...state, phoneNumber:action.payload}
    case ACTION_CONSTANTS.USER_PROFILE:
        return{...state, userProfile:action.payload} 
    case ACTION_CONSTANTS.USER_PROFILE_PICTURE:
        return{...state, profilePicture:action.payload}     
    default:
      return state;
  }
};

export default user;