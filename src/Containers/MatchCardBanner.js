import { Avatar, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { API } from "../apiManager/endPoints";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
export const MatchCardBanner = (props) => {
  const [matchData, setMatchData] = React.useState(props.matchData);

  useEffect(() => {
    setMatchData(props.matchData);
  }, [props.matchData]);

  const styles = {
    bannerParentDiv: {
      paddingTop: "0.5%",
      display: "flex",
      justifyContent: "spaace-evenly",
      height: "10%",
    },
    abbrevationDiv: { display: "flex", justifyContent: "center" },
    homeAbbrevation: {
      color: "#FFFFFF",
      backgroundColor: "#DF3843",
      width: "auto",
      borderRadius: "0.2vw",
      padding: "2%",
      boxSizing: "border-box",
      textAlign: "center",
      wordBreak: "break-all",
    },
    awayAbbrevation: {
      color: "#FFFFFF",
      backgroundColor: "#2A78BF",
      width: "auto",
      borderRadius: "0.2vw",
      padding: "2%",
      textAlign: "center",
      boxSizing: "border-box",
      wordBreak: "break-all",
    },
    versus: {
      display: "flex",
      justifyContent: "center",
      color: "#FFFFFF",
      alignContent: "center",
      padding: "1vw",
      backgroundColor: "grey",
      maxWidth: "3%",
      borderRadius: "50%",
      height: "10%",
      border: "solid 2% darkGrey",
      opacity: 0.5,
      marginTop: "1vw",
    },
    scoreParentDiv: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "4%",
    },
    bannerBottomText: {
      color: "#FFFFFF",
      display: "flex",
      justifyContent: "center",
      borderBottom: "solid 0.1em #A494E1",
    },
    bannerBottomDiv: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "solid 0.1em #A494E1",
    },
    bannerBottomDivTextLeft: {
      color: "#FFFFFF",
      display: "flex",
      justifyContent: "flex-start",
      padding: "1%",
    },
    bannerBottomDivTextRight: {
      color: "#FFFFFF",
      display: "flex",
      justifyContent: "flex-end",
      padding: "1%",
    },
    teamDivleft: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "1vw",
    },
    teamDivright: {
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "1vw",
    },
    score: { color: "#FFFFFF", wordBreak: "break-all" },
    scoreSubText: {
      color: "#FFFFFF",
      display: "inline-block",
      marginTop: "0",
      fontWeight: "lighter",
    },
    team: {
      display: "flex",
      justifyContet: "center",
      flexDirection: "column",
    },
    bottomBannerParentDiv: {
      width: "100%",
      height: "auto",
      backgroundImage: "linear-gradient(120deg,#661324, #130A1D)",
      // paddingBottom: "2vw",
    },
    bottombannerPictureParentdiv: { display: "flex", justifyContent: "center" },
    bottombannerTextParentdiv: {
      backgroundColor: "#571A58",
      paddingLeft: 0,
      paddingRight: 0,
      width: "100%",
      display: "inline-block",
      justifyContent: "center",
      height: "auto",
      borderRadius: "1vw",
    },
    playerDiv: {
      backgroundColor: "#7C3B7D",
      padding: "0 0 0",
      display: "flex",
      justifyContent: "flex-start",
      width: "auto",
      borderRadius: "1em 3em 0em 1vw",
    },
    playerDivText: {
      color: "#FFFFFF",
      fontSize: "2vw",
      fontWeight: "lighter",
      padding: "0.3vw",
      wordBreak: "break-all",
    },
    scoreDivbannerbottom: {
      color: "#FFFFFF",
      fontSize: "2vw",
      padding: "0.3vw",
      fontWeight: "bolder",
      wordBreak: "break-all",
      display: "inline-block",
    },
    bottomBannerBottomScore: {
      display: "flex",
      justifyContent: "center",
      paddingTop: "2vw",
      textAlign: "center",
    },
    mainScore: {
      color: "#FFFFFF",
      fontSize: "5vw",
      display: "inline-block",
      margin: 0,
      fontWeight: "600",
    },
    subScore: {
      color: "#FFFFFF",
      paddingLeft: "0.3vw",
      fontSize: "3vw",
      display: "inline-block",
      fontWeight: "600",
      marginTop: "0.4vw",
    },
    bottomBannerBottomText: {
      fontSize: "2vw",
      color: "#FFFFFF",
      textAlign: "center",
    },
  };

  const [currentPlayers, setCurrentPlayers] = useState({
    currentBatsman: {},
    supportBatsman: {},
    currentBowler: {},
  });

  useEffect(() => {
    if (matchData?.balls?.length > 0) {
      const batId = matchData.balls[matchData.balls?.length - 1]?.batsman.id;

      const sprtBatId = (() => {
        if (
          matchData?.balls[matchData.balls?.length - 1]?.batsmantwo?.id == batId
        ) {
          if (
            matchData?.balls[matchData.balls.length - 1]
              ?.batsman_one_on_creeze_id == batId
          )
            return matchData?.balls[matchData.ball.length - 1]
              .batsman_two_on_creeze_id;
          else
            return matchData?.balls[matchData.balls.length - 1]
              ?.batsman_one_on_creeze_id;
        } else
          return matchData?.balls[matchData.balls?.length - 1]?.batsmantwo?.id;
      })();
      const bowId = matchData.balls[matchData.balls?.length - 1]?.bowler?.id;
      const batsman = matchData.batting.find(
        (player) => player.player_id === batId
      );
      const supportBatsman = matchData.batting.find(
        (player) => player.player_id === sprtBatId
      );
      const bowler = matchData.bowling.find(
        (player) => player.player_id === bowId
      );
      setCurrentPlayers({
        ...currentPlayers,
        currentBatsman: batsman,
        supportBatsman: supportBatsman,
        currentBowler: bowler,
      });
    }
  }, [matchData]);

  return (
    <>
      <div className="" style={{ padding: "1rem" }}>
        <div className="each-row"  >
          <div
            className="card-row"
            style={{color: "#fff" ,border:"none"}}
          >
            <div className="card-row-item">
              <Avatar
                alt="Remy Sharp"
                src={matchData?.localteam?.image_path}
                sx={{
                  boxShadow:"5px 5px 5px #000",
                  height: "5rem",
                  width: "5rem",
                  marginRight: "10px",
                }}
              />
              <h2>{matchData?.localteam?.code}</h2>
            </div>
            <h2>vs</h2>
            <div className="card-row-item card-flex-end">
              <h2>{matchData?.visitorteam?.code}</h2>

              <Avatar
                alt="Remy Sharp"
                src={matchData?.visitorteam?.image_path}
                sx={{
                  height: "5rem",
                  boxShadow:"-5px 5px 5px #000",
                  width: "5rem",
                  marginLeft: "10px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="player-wrapper">
                {/* bowler */}
                <div className="player-details">
                {currentPlayers && (
                  <img 
                  className="player-image-bowler"
                  alt=""
                  src={API.GET_PLAYER_IMAGE(
                    `${currentPlayers?.currentBowler?.bowler?.id}`
                  )}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "images/mwood.png";
                  }}
                  />
                )}
                  
                  <div className="player-info">
                  {matchData?.balls?.length >  0 && (
                 
                     <span className="player-name"> {currentPlayers?.currentBowler?.bowler?.fullname || "unknown"}</span>
                    )}

                    <span className="player-score">
                    {currentPlayers?.currentBowler?.runs || "0"}/
                {currentPlayers?.currentBowler?.wickets || "0"} -{" "}
                {currentPlayers?.currentBowler?.overs || "0"}
                    </span>
                    
                
                   
                  </div>
                </div>
                <div className="batsman-wrapper">


                  {/* batsman */}
                  <div className="player-details">
                  {currentPlayers && (
                  <img 
                  className="player-image-batsman"
                  alt=""
                  src={API.GET_PLAYER_IMAGE(
                    `${currentPlayers?.currentBatsman?.batsman?.id}`
                  )}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "images/kohli8.png";
                  }}
                  />
                )}
                  <div className="player-info">
                  {matchData?.balls?.length >  0 && (
                 
                 <span className="player-name">  {currentPlayers?.currentBatsman?.batsman?.fullname ||
                "unknown"} </span>
                )}
                    <span className="player-score">{currentPlayers?.currentBatsman?.score || "0"} (
                {currentPlayers?.currentBatsman?.ball || "0"})</span>
                  </div>
                </div>
                {/* main score */}
                <div className="main-score">
                {matchData?.runs?.length > 0 && (
              <>
                <h2 >
                  {matchData?.runs[matchData?.runs?.length - 1]?.score || "0"} -{" "}
                  {matchData?.runs[matchData?.runs?.length - 1]?.wickets || "0"}
                </h2> 
                <h3 >
                  {" "}
                  {matchData?.runs[matchData?.runs?.length - 1]?.overs || "0"} overs
                </h3>
              </>
            )}
                  <h4>{matchData?.note}</h4>
                </div>
                {/* supporter */}
                <div className="player-details">
                {currentPlayers && (
                  <img 
                  className="player-image-batsman"
                  alt=""
                  src={API.GET_PLAYER_IMAGE(
                    `${currentPlayers?.supportBatsman?.batsman?.id}`
                  )}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "images/rahulok.png";
                  }}
  
                  />
                )}
                  <div className="player-info">
                  {matchData?.balls?.length >  0 && (
                    <span className="player-name"> {currentPlayers.supportBatsman?.batsman?.fullname ||
                      "unknown"} </span>
                  )}
                    <span className="player-score">{currentPlayers?.supportBatsman?.score || "0"} (
                    {currentPlayers?.supportBatsman?.ball || "0"})</span>
                  </div>
                </div>
                </div>
        </div>

      </div>
    </>
  );
};