import { Action } from "history";
import ACTION_CONSTANTS from "../actions/constant";


export const setMatchId = (matchId) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.SET_CURRENT_MATCH_ID,
    payload: matchId,
  });
};

export const setLiveMatchDetails = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.LIVE_MATCH_DETAILS,
    payload: data,
  });
};

export const setFixtureMatchDetails = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.FIXTURE_MATCH_DETAILS,
    payload: data,
  });
};

export const setFinishedMatchDetails = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.FINISHED_MATCH_DETAILS,
    payload: data,
  });
};

export const setUpcomingMatchDetails = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.UPCOMING_MATCH_DETAILS,
    payload: data,
  });
};

export const setTeamRankings = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.TEAM_RANKINGS,
    payload: data,
  });
};

export const setLeagues = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.GET_LEAGUES,
    payload: data,
  });
};

export const setCurrentMatchData = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.SET_CURRENT_MATCH_DATA,
    payload: data
  })
}
