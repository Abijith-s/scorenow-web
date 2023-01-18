import ACTION_CONSTANTS from "../actions/constant";

const initialState = {
  newsList: [],
  newsDetails: [],
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.GET_NEWS_LIST:
      return { ...state, newsList: action.payload };
    case ACTION_CONSTANTS.GET_NEWS_DETAILS:
      return { ...state, newsDetails: action.payload };
    default:
      return state;
  }
};

export default news;
