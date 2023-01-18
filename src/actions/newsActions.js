import ACTION_CONSTANTS from "../actions/constant";

export const setNewsList = (data) => (dispatch) => {
    dispatch({
      type: ACTION_CONSTANTS.GET_NEWS_LIST,
      payload: data,
    });
  };

  export const setNewsDetails = (data) => (dispatch) => {
    dispatch({
      type: ACTION_CONSTANTS.GET_NEWS_DETAILS,
      payload: data,
    });
  };