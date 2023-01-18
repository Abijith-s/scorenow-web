import { httpGETRequest } from "../httpRequestHandler";
import { API } from "../endPoints";
import {
  setFinishedMatchDetails,
  setFixtureMatchDetails,
  setLeagues,
  setTeamRankings,
  setUpcomingMatchDetails,
} from "../../actions/cricketDetailActions";

export const getLiveMatchesUpdates = (data, ...rest) => {
  // const url = API.GET_LIVE_MATCHES;
  // return async(dispatch)=>{
  //   await  httpGETRequest(url).then((res) =>{
  //         dispatch(setLiveMatchDetails(res.data));
  //      });
  // }
};

// export const getFixureMatchesUpdates = (data, ...rest) => {
//   const url = API.GET_FIXTURE_MATCHES;

//   return async (dispatch) => {
//     await httpGETRequest(url).then((res) => {
//       dispatch(setFixtureMatchDetails(res.data.data));
//     });
//   };
// };
export const getFinishedMatchesUpdates = (data, ...rest) => {
  const url = API.GET_FINISHED_MATCHES;

  return async (dispatch) => {
    await httpGETRequest(url).then((res) => {
      dispatch(setFinishedMatchDetails(res.data.data));
    });
  };
};

export const getUpcomingMatchesUpdates = (data, ...rest) => {
  const url = API.GET_UPCOMING_MATCHES;
  return async (dispatch) => {
    await httpGETRequest(url).then((res) => {
      dispatch(setUpcomingMatchDetails(res.data.data));
    });
  };
};

export const getTeamRankingsUpdates = (data, ...rest) => {
  const url = API.GET_TEAM_RANKING;
  return async (dispatch) => {
    await httpGETRequest(url).then((res) => {
      dispatch(setTeamRankings(res.data.data));
    });
  };
};

export const getLeagues = (data, ...rest) => {
  const url = API.GET_LEAGUES;
  return async (dispatch) => {
    await httpGETRequest(url).then((res) => {
      dispatch(setLeagues(res.data.data));
    });
  };
};


