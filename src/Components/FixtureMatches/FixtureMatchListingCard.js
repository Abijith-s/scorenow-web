import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

const FixtureMatchListingCards = (props) => {
  
 

  const fixtureMatchDetails = useSelector(
    (state) => state.cricketReducer.fixtureMatchDetails
  );
 
  const styles = {
    mainParentDiv: {
      width: "100%",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      position: "relative",
    },
    cardHeaderDiv: {
      display: "flex",
      backgroundColor: "#A62539",
      justifyContent: "space-between",
    },
    cardParentDiv: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 0,
      marginRight: 0,
    },
    card: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#402E51",
      height: "25em",
      boxShadow: "10px 10px 10px black",
      marginBottom: "1em",
      marginTop: "0.5em",
      width: "100%",
      borderRadius: "2em",
      border: "solid #A494E1 0.1em",
    },
    cardHeader: {
      textDecoration: "none",
      color: "#FFFFFF",
      borderBottom: "solid #A494E1 0.1em",
      padding: "1% 0 1%",
    },
    team: {
      display: "flex",
      justifyContent: "space-between",
      padding: "2%",
    },
    textStyles: {
      textDecoration: "none",
      color: "#FFFFFF",
    },
    scores: {
      color: "#FFFFFF",
      display: "flex",
      justifyContent: "flex-end",
    },
    extrasStyle: {
        color: "#FFFFFF",
        fontWeight: "lighter",
        fontSize: "2em",
    }
  };

  return (
    <div style={styles.mainParentDiv}>
      {fixtureMatchDetails.map((e) => {
        return (<div className="col-sm-12" style={styles.cardParentDiv}>
        <div className="col-sm-12" style={styles.card}>
          <div style={styles.cardHeader}>
            <p style={styles.extrasStyle}>
              {e.league}
            </p>
          </div>
          <div className="col-sm-12" style={styles.team}>
            <div classname="col-sm-6">
              <div className="col-sm-3">
                <Avatar
                  alt="Remy Sharp"
                  src={e.homeTeamLogo}
                />
              </div>
              <div className="col-sm-9">
                <h2 style={styles.textStyles}>{e.homeTeam}</h2>
              </div>
            </div>
          </div>
          <div className="col-sm-12" style={styles.team}>
            <div classname="col-sm-6">
              <div className="col-sm-3">
                <Avatar
                  alt="Remy Sharp"
                  src={e.awayTeamLogo}
                />
              </div>
              <div className="col-sm-9">
                <h2 style={styles.textStyles}>{e.awayTeam}</h2>
              </div>
            </div>
          </div>
          <div className="col-sm-12" style={styles.extrasStyle}>
            <p>{new Date(e.startingDate).toLocaleString()}</p>
          </div>
        </div>
        </div>)
      })}
     
      {/* ); */}
      {/* })} */}
    </div>
  );
};
export default FixtureMatchListingCards;
