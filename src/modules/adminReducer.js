import ACTION_CONSTANTS from "../actions/constant";

const initialState = {
  adminUserMessage: {},
  upcomingMatches:[]
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.ADMIN_MESSAGE:
      return { ...state, adminUserMessage: action.payload };
    case ACTION_CONSTANTS.CLEAR_ADMIN_MESSAGE:
      return { ...state, adminUserMessage: action.payload };
    case ACTION_CONSTANTS.ADMIN_UPCOMING_MATCHES:
      return { ...state, upcomingMatches: action.payload };  
    default:
      return state;
  }
};

export default admin;
