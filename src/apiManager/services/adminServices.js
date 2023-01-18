import { httpGETRequest, httpPOSTRequest } from "../httpRequestHandler";
import { API } from "../endPoints";
import { setPlayerSearchResults } from "../../actions/favoritesActions";
import { setAdminUpcomingMatches } from "../../actions/adminAction";

export const adminLogin = (data, setMessage) => {
  const url = API.ADMIN_AUTHENTICATION;
  return async (dispatch) => {
    let response = await httpPOSTRequest(url, data);
    setMessage(response.data.message);
  };
};

export const playerImageUpload = (data, setMessage) => {
  const url = API.PLAYER_IMAGE_UPLOAD;

  return async (dispatch) => {
    let response = await httpPOSTRequest(url, data);
  };
};

export const searchPlayersForAdmin = (data,...rest)=>{
  
  const url = API.ADMIN_SEARCH_PLAYERS
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

export const getAdminUpcomingMatches = (data,...rest)=>{
  
  const url = API.ADMIN_UPCOMING_MATCHES
  return async (dispatch) => {
      try {
         await httpGETRequest(url).then((response)=>{
          
          dispatch(setAdminUpcomingMatches(response.data))
         })
      }
      catch (err) {
          console.log("error",err);
      }
  }
}

export const webBannerImageUpload = (data, setMessage) => {
  const url = API.WEB_BANNER_IMAGE_UPLOAD;

  return async (dispatch) => {
    let response = await httpPOSTRequest(url, data);
  };
};

export const mobileBannerImageUpload = (data, setMessage) => {
  const url = API.MOBILE_BANNER_IMAGE_UPLOAD;

  return async (dispatch) => {
    let response = await httpPOSTRequest(url, data);
  };
};



