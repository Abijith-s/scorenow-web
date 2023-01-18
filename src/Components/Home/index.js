import React, { useEffect, useState } from "react";
import Carousal from "../../Containers/Carousal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Footer } from "../../Containers/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Section from "./Sections"

import {
  getFinishedMatchesUpdates,
  getLeagues,
  getTeamRankingsUpdates,
  getUpcomingMatchesUpdates,
} from "../../apiManager/services/cricketServices";
import {
  getNewsDetails,
  getNewsList,
} from "../../apiManager/services/newsServices";
import { API } from "../../apiManager/endPoints";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import {ContactForm} from "../ContactForm";

function fetchWithAuthentication(url) {
  const headers = new Headers();
  headers.set(
    "X-RapidAPI-Key",
    process.env.REACT_APP_X_RAPID_API_KEY
  );
  headers.set("X-RapidAPI-Host", process.env.REACT_APP_X_RAPIDAPI_HOST);
  return fetch(url, { headers });
}

export const Home = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [newsId, setNewsId] = useState(null);
  useEffect(() => {
    dispatch(getUpcomingMatchesUpdates());
    dispatch(getNewsList());
  }, []);
  let list = useSelector((state) => state.newsReducer.newsList);
  
  
  const handleDetailsClick = (e) =>{
    dispatch(
      getNewsDetails({ id: `${e.story?.id}` })
    );
    navigate(`/detailspage/${e.story?.id}`);
  }  



  async function displayProtectedImage(imageId) {
    // Fetch the image.
    const url = API.GET_NEWS_IMAGES(imageId);
    await fetchWithAuthentication(url).then(async (response) => {
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);

      // // Update the source of the image.
      const imageElement = document.getElementById(imageId);
      imageElement.src = imageObjectURL;
    });

    // Convert the data to Base64 and build a data URL.
  }

  return (
    <>
      <div><Carousal /></div>
      <Section />
      <div className="main-contianer">
        <div class="container">
          <h1 className="heading">Checkout News and Latest updates here! ⇓</h1>
        </div>
        <div class="content">
          <div class="container">
            <div
              class="content-top"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
                  {
                    list?.map((e)=>{
                      return(
                        <>
                        {
                          e.story && (
                            <Grid item xs={12} sm={12} md={4}>
                            <div className="img-overlay" onClick={()=>{handleDetailsClick(e)}}>
                              <img
                                id ={e.story?.imageId}
                                 src={displayProtectedImage(e.story?.imageId)}
                                 alt=""
                                 onError={({ currentTarget }) => {
                                   currentTarget.onerror = null; // prevents looping
                                   currentTarget.src =
                                     "https://thumbs.dreamstime.com/b/batsman-cricket-icons-mobile-concept-web-apps-batsman-cricket-icons-mobile-concept-web-apps-sign-symbol-icon-124089962.jpg";
                                 }}
                                className="img-overlay-image"
                              />
                              <div className="overlay">
                                <div className="text">{e.story?.hline}</div>
                              </div>
                            </div>
                            </Grid>
                          )
                        }
                        </>
                      )
                    })
                  }
                </Grid>
              </Box>
            </div>
          </div>
{/* 
          <div class="main-contianer-primary">
            <div class="container" style={{paddingTop:"2rem",paddingBottom:"2rem"}}>
              <h2
                className="Heading"
                style={{ color: "#fff",  }}
              >
                HEADLINES
              </h2>
              { list?.map((e)=>{
                  return(
                    <>
                    {e.story &&
              <div className="headlines"  onClick={() => {
               handleDetailsClick(e)
              }}>  
              <span style={{ color: "#fff" }}>{e.story?.hline}</span>
                    
              </div>}
              </>
               )
              })}
            </div>
          </div> */}
        </div>
      </div>
      <Grid item xs={12} sm={12} md={12}>
        <ContactForm/>
      <Footer />
      </Grid>
    </>
  );
};
