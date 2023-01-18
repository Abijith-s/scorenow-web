import ACTION_CONSTANTS from "../actions/constant";


const initialState = {
  liveMatchDetails: [],
  fixtureMatchDetails: [],
  finishedMatchDetails: [],
  upcomingMatchDetails: [],
  leagues:[],
  teamRankings:null,
  currentMatchData: {},
  currentMatchId: null
};
const cricketDetails = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.LIVE_MATCH_DETAILS:
      return { ...state, liveMatchDetails: action.payload };
    case ACTION_CONSTANTS.FIXTURE_MATCH_DETAILS:
      return { ...state, fixtureMatchDetails: action.payload };
    case ACTION_CONSTANTS.FINISHED_MATCH_DETAILS:
      return { ...state, finishedMatchDetails: action.payload };
    case ACTION_CONSTANTS.UPCOMING_MATCH_DETAILS:
      return { ...state, upcomingMatchDetails: action.payload };
    case ACTION_CONSTANTS.SET_CURRENT_MATCH_ID:
      return { ...state, currentMatchId: action.payload };
    case ACTION_CONSTANTS.TEAM_RANKINGS:
      return { ...state, teamRankings: action.payload };  
    case ACTION_CONSTANTS.GET_LEAGUES:
      return { ...state, leagues: action.payload };  
    case ACTION_CONSTANTS.SET_CURRENT_MATCH_DATA:
      return { ...state, currentMatchData: action.payload };
    default:
      return state;
  }
}

export default cricketDetails;