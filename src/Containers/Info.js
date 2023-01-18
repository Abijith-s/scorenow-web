import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import StadiumRoundedIcon from "@mui/icons-material/StadiumRounded";
import { useSelector } from "react-redux";

export const Info = (props) => {

  const cricketReducer = useSelector(state => state.cricketReducer?.currentMatchData);

  const [matchData, setMatchData] = useState(cricketReducer);

  React.useEffect(() => {
    setMatchData(cricketReducer);
  }, [cricketReducer]);

  const [infoData, setInfoData] = useState({
    tossWonBy: '',
    elected: ''
  })
  useEffect(() => {
    if (matchData) {
      let tossWonBy = matchData?.toss_won_team_id;
      if (matchData?.localteam?.id == tossWonBy) {
        tossWonBy = matchData?.localteam?.name;
      } else {
        tossWonBy = matchData?.visitorteam?.name;
      };

      setInfoData({ ...infoData, tossWonBy: tossWonBy, elected: matchData?.elected });
    }
  }, [matchData]);

  const styles = {
    mainParentDiv: {
      width: "100%",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      padding: "2em",
      backgroundColor: "#0b0817",
      flexDirection: "column",
    },
    card: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: "#402E51",
      height: "auto",
      boxShadow: "10px 10px 10px black",
      marginBottom: "1em",
      marginTop: "0.5em",
      padding:"1rem",
      width: "100%",
      borderRadius: "2em",
      border: "solid #A494E1 0.1em",
      flexWrap:"wrap",
    },
    teamDiv: {
      width: "auto",
      display: "flex",
      justifyContent: "center",
      padding: "2%",
      //   flexDirection:"row",
    },
    team: { fontSize: "3vw", color: "#FFFFFF", fontWeight: "500" },
    versusStyle: {
    
      color: "#FFFFFF",
      fontWeight: "800",
      color: "gray",
      paddingTop: "0.3em",
      textAlign:"center"
    },
    teamParent: { display: "flex", justifyContent: "center" },
    bottomTextDiv: { display: "flex", justifyContent: "center" },
    bottomText: {   color: "#FFFFFF", fontWeight: "500" },
    secondCardInnerDiv: {
      display: "flex",
      //   justifyContent: "center",
      flexDirection: "row",
    },
    iconStyle: {
      width: "2vw",
      height: "2vw",
      color: "#FFFFFF",
      marginTop: "0.5em",
    },
  };
  return (
    <div  >
      {/* FirstCard */}
      <div  style={{padding:"1rem", background:"#402E51", borderRadius:"1rem"}}>
        <div className="first-card">
        <div style={{display:"flex", alignItems:"center"}} >
              <Avatar
                alt="0"
               
                src={matchData?.localteam?.image_path}
              />
              <h1 style={{marginLeft:"20px"}} >{matchData?.localteam?.name}</h1>
            </div>
          
            <h1 style={{textAlign:"center"}}>VS</h1>
           
          <div  style={{display:"flex", alignItems:"center"}}>
              <h1  style={{marginRight:"20px"}}>{matchData?.visitorteam?.name}</h1>
              <Avatar
                alt="0"
             
                src={matchData?.visitorteam?.image_path}
              />
            </div>
        </div>
        <div className="col-sm-12 col-xs-12" style={styles.bottomTextDiv}>
          <p style={styles.bottomText}>{infoData.tossWonBy} won the toss and chose to {infoData.elected}</p>
        </div>
      </div>
      {/* secondCard */}
      <div className="col-sm-12 col-xs-12" style={styles.card}>
        <div className="col-sm-12 col-xs-12" style={styles.secondCardInnerDiv}>
          <div className="col-sm-3 col-xs-3">
            <p style={styles.bottomText}>Match</p>
          </div>
          <div className="col-sm-9 col-xs-9">
            <p style={styles.bottomText}>{matchData?.round}</p>
          </div>
        </div>
        <div className="col-sm-12 col-xs-12" style={styles.secondCardInnerDiv}>
          <div className="col-sm-3 col-xs-3">
            <p style={styles.bottomText}>Series</p>
          </div>
          <div className="col-sm-9 col-xs-9">
            <p style={styles.bottomText}>{matchData?.league?.name}</p>
          </div>
        </div>
      </div>
      {/* thirdCard */}
      <div className="col-sm-12 col-xs-12" style={styles.card}>
        <div className="col-sm-12 col-xs-12" style={styles.secondCardInnerDiv}>
          <div className="col-sm-3 col-xs-3">
            <DateRangeIcon
              sx={{
                
                color: "#FFFFFF",
                marginTop: "0.5em",
              }}
            />
          </div>
          <div className="col-sm-9 col-xs-9">
            <p style={styles.bottomText}>{new Date(matchData?.starting_at).toLocaleDateString()} {new Date(matchData?.starting_at).toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="col-sm-12 col-xs-12" style={styles.secondCardInnerDiv}>
          <div className="col-sm-3 col-xs-3">
            <StadiumRoundedIcon
              sx={{
             
                color: "#FFFFFF",
                marginTop: "0.5em",
              }}
            />
          </div>
          <div className="col-sm-9 col-xs-9">
            <p style={styles.bottomText}>
              {matchData?.venue?.name}, {matchData?.venue?.city}
            </p>
          </div>
        </div>
      </div>
      {/* FourthCard */}
      <div className="col-sm-12 col-xs-12" style={styles.card}>
        <div className="col-sm-12 col-xs-12" style={styles.secondCardInnerDiv}>
          <div className="col-sm-3 col-xs-3">
            <p style={styles.bottomText}>Umpires</p>
          </div>
          <div className="col-sm-9 col-xs-9">
            <p style={styles.bottomText}>{matchData?.firstumpire?.fullname}</p>
          </div>
        </div>
        <div className="col-sm-12 col-xs-12" style={styles.secondCardInnerDiv}>
          <div className="col-sm-3 col-xs-3">
            <p style={styles.bottomText}>3rd Ump</p>
          </div>
          <div className="col-sm-9 col-xs-9">
            <p style={styles.bottomText}>{matchData?.secondumpire?.fullname}</p>
          </div>
        </div>
        <div className="col-sm-12 col-xs-12" style={styles.secondCardInnerDiv}>
          <div className="col-sm-3 col-xs-3">
            <p style={styles.bottomText}>Referee</p>
          </div>
          <div className="col-sm-9 col-xs-9">
            <p style={styles.bottomText}>{matchData?.referee?.fullname}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
