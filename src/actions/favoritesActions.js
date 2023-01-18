import ACTION_CONSTANTS from "../actions/constant";

export const setFavourites = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.GET_FAVOURITES,
    payload: data,
  });
};

export const setFavouritePlayers = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.PLAYERS,
    payload: data,
  });
};

export const setFavouriteTeams = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.TEAMS,
    payload: data,
  });
};

export const setFavouriteLeagues = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.LEAGUES,
    payload: data,
  });
};

export const setPlayerSearchResults = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.GET_SEARCH_RESULTS,
    payload: data.data,
  });
};

