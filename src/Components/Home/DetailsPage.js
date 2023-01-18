import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { API } from "../../apiManager/endPoints";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function fetchWithAuthentication(url) {
  const headers = new Headers();
  headers.set("X-RapidAPI-Key", process.env.REACT_APP_X_RAPID_API_KEY);
  headers.set("X-RapidAPI-Host", process.env.REACT_APP_X_RAPIDAPI_HOST);
  return fetch(url, { headers });
}
export const DetailsPage = () => {
  let { id } = useParams();
  const [imageData, setImage] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    displayProtectedImage(id);
  }, [id]);
  const newsDetails = useSelector(
    (state) => state.newsReducer.newsDetails.content
  );
  const readMoreButtonUrl = useSelector(
    (state) => state.newsReducer.newsDetails.appIndex || {}
  );

  async function displayProtectedImage(imageId) {
    // Fetch the image.
    const url = API.GET_NEWS_IMAGES(imageId);
    await fetchWithAuthentication(url).then(async (response) => {
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImage(imageObjectURL);
    });

    // Convert the data to Base64 and build a data URL.
  }

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "calc(100vh - 65px)",
      }}
    >
      <Link to="/">
        <button className="back-arrow">
          <ArrowBackRoundedIcon
            sx={{
              "&:hover": { color: "#402E51" },
              position: "absolute",
              marginTop: "-0.1em",
              fontSize:"2.5em"
            }}
          />
        </button>
      </Link>
      <div className="container">
        <h1 className="news-heading">{readMoreButtonUrl?.seoTitle}</h1>
        {!imageData && (
          <div class="card" style={{ minHeight: "500px" }}>
            <div class="square"></div>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            className="img-responsive"
            src={imageData}
            alt=""
            style={{ height: "50%", maxWidth: "50%" }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://thumbs.dreamstime.com/b/batsman-cricket-icons-mobile-concept-web-apps-batsman-cricket-icons-mobile-concept-web-apps-sign-symbol-icon-124089962.jpg";
            }}
          />
        </div>
        <div style={{ padding: "1.5em" }}>
          {newsDetails?.map((e) => {
            const replaceText = e.content?.contentValue.substr(
              e.content?.contentValue.indexOf("@"),
              4
            );
            return (
              <p> {e.content?.contentValue.replaceAll(replaceText, "")} </p>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "3rem",
          }}
        >
          <button
            style={{
              border: "none",
              background: "none",

              "&:hover": { color: "#402E51" },
            }}
          >
            <a
              href={`${readMoreButtonUrl.webURL}`}
              style={{
                // textDecoration: "none",
                padding: "18px 25px",
                border: "red 0.1em solid",
                color: "white",

                "&:hover": { color: "#402E51" },
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};
