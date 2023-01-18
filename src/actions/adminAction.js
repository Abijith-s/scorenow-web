import ACTION_CONSTANTS from "../actions/constant";

export const setAdminMessage = (data) => (dispatch) => {
    dispatch({
      type: ACTION_CONSTANTS.ADMIN_MESSAGE,
      payload: data,
    });
  };
  
  export const setClearAdminMessage = (data) => (dispatch) => {
    dispatch({
      type: ACTION_CONSTANTS.CLEAR_ADMIN_MESSAGE,
      payload: data,
    });
  };
 
  export const setAdminUpcomingMatches = (data) => (dispatch) => {
    dispatch({
      type: ACTION_CONSTANTS.ADMIN_UPCOMING_MATCHES,
      payload: data,
    });
  };
  