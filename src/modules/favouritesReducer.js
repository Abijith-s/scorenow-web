import ACTION_CONSTANTS from "../actions/constant";

const initialState = {
  favourites: [],
  players: [],
  leagues: [],
  teams: [],
  searchResults:[]
};

const favourites = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.GET_FAVOURITES:
      return { ...state, favourites: action.payload };
    case ACTION_CONSTANTS.PLAYERS:
      return { ...state, players: action.payload };
    case ACTION_CONSTANTS.LEAGUES:
      return { ...state, leagues: action.payload };
    case ACTION_CONSTANTS.TEAMS:
      return { ...state, teams: action.payload };
    case ACTION_CONSTANTS.GET_SEARCH_RESULTS:
      return{...state,searchResults:action.payload}  
    default:
      return state;
  }
};

export default favourites;
