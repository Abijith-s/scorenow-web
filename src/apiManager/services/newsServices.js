import axios from "axios";
import { setNewsDetails, setNewsList } from "../../actions/newsActions";
import { API } from "../endPoints";

export const getNewsList = (data, ...rest) => {
  const url = API.GET_NEWS_LIST;

  return async (dispatch) => {
    try {
      const response =await axios.get(url, {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_X_RAPIDAPI_HOST,
        },
      });
      dispatch(setNewsList(response.data.storyList))
    } catch (err) {
      console.log(err);
    }

  };
};

export const getNewsDetails = (data, ...rest) => {
  const url = API.GET_NEWS_DETAILS(data.id)

  return async (dispatch) => {
    try {
      const response =await axios.get(url, {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_X_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_X_RAPIDAPI_HOST,
        },
      });
      dispatch(setNewsDetails(response.data))
    } catch (err) {
      console.log(err);
    }

  };
};


 
