import { httpGETRequest, httpPOSTRequest } from "../httpRequestHandler";
import { API } from "../endPoints";
import {
  setFavouriteLeagues,
  setFavouritePlayers,
  setFavourites,
  setFavouriteTeams,
  setPlayerSearchResults,
} from "../../actions/favoritesActions";

export const getFavourites = (data, ...rest) => {
  const url = API.GET_ALL_FAVOURITES;
  return async (dispatch) => {
    await httpGETRequest(url).then((res) => {
      if(res.data){
        dispatch(setFavourites(res.data.data));
      }
    });
  };
};

export const getPlayers = (data, ...rest) => {
  const url = API.GET_PLAYERS;
  return async (dispatch) => {
    await httpGETRequest(url).then((res) => {
      dispatch(setFavouritePlayers(res.data.data));
    });
  };
};

export const getTeams = (data, ...rest) => {
  const url = API.GET_TEAMS;
  return async (dispatch) => {
    await httpGETRequest(url).then((res) => {
      dispatch(setFavouriteTeams(res.data.data));
    });
  };
};

export const getLeagues = (data, ...rest) => {
  const url = API.GET_FAV_LEAGUES;
  return async (dispatch) => {
    await httpGETRequest(url).then((res) => {
      dispatch(setFavouriteLeagues(res.data.data));
    });
  };
};

export const addLeaguesToFavourite = (data,...rest)=>{
    const done = rest.length ? rest[0] : () => { };
    const url = API.ADD_LEAGUES_TO_FAVOURITE
    return async (dispatch) => {
        try {
            let response = await httpPOSTRequest(url, data);
            done(true);
        }
        catch (err) {
            console.log("error",err);
            done(false);
        }
    }
}

export const addTeamsToFavourite = (data,...rest)=>{
  const done = rest.length ? rest[0] : () => { };
  const url = API.ADD_TEAMS_TO_FAVOURITE
  return async (dispatch) => {
      try {
          let response = await httpPOSTRequest(url, data);
          done(true);
      }
      catch (err) {
          console.log("error",err);
          done(false);
      }
  }
}

export const addPlayersToFavourite = (data,...rest)=>{
  const done = rest.length ? rest[0] : () => { };
  const url = API.ADD_PLAYERS_TO_FAVOURITE
  return async (dispatch) => {
      try {
          let response = await httpPOSTRequest(url, data);
      }
      catch (err) {
          console.log("error",err);
          done(false);
      }
  }
}
export const searchForPlayers = (data,...rest)=>{
  const url = API.SEARCH_FOR_PLAYERS
  return async (dispatch) => {
      try {
         await httpPOSTRequest(url, data).then((response)=>{
          dispatch(setPlayerSearchResults(response))
         })
      }
      catch (err) {
          console.log("error",err);
      }
  }
}

export const deletePLayersFromFavourite = (data,...rest)=>{
  const url = API.DELETE_FAVOURITE_PLAYERS
  return async (dispatch) => {
    await httpPOSTRequest(url, data).then((res)=>{
      dispatch(setFavourites(res.data.data));
    }).catch((err)=>{
      console.log("error",err)
    });
  }
}

export const deleteTeamsFromFavourite = (data,...rest)=>{
  const url = API.DELETE_FAVOURITE_TEAMS
  return async (dispatch) => {
    await httpPOSTRequest(url, data).then((res)=>{
      dispatch(setFavourites(res.data.data));
    }).catch((err)=>{
      console.log("error",err)
    });
  }
}
export const deleteLeaguesFromFavourite = (data,...rest)=>{
  const url = API.DELETE_FAVOURITE_LEAGUES
  return async (dispatch) => {
    await httpPOSTRequest(url, data).then((res)=>{
      dispatch(setFavourites(res.data.data));
    }).catch((err)=>{
      console.log("error",err)
    });
  }
}