import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { style } from "@mui/system";
import { useSelector } from "react-redux";

export const Squad = (props) => {

  const cricketReducer = useSelector(state => state.cricketReducer?.currentMatchData);

  const [matchData, setMatchData] = useState(cricketReducer);

  React.useEffect(() => {
    setMatchData(cricketReducer);
  }, [cricketReducer]);

  const styles = {
    mainParentDiv: {
      width: "100%",
      height: "auto",
      display: "flex",
      justifyContent: "space-around",
      padding: "2em",
      backgroundColor: "#0b0817",
      flexDirection: "row",
    },
    teamDiv: {
      display: "flex",
      padding: 0,
    },
    team: { fontSize:"1.5rem", color: "#FFFFFF", fontWeight: "500" },
    teamParent: { display: "flex", justifyContent: "center" },
    header: {
      backgroundColor: "#23202e",
      display: "flex",
      justifyContent: "center",
      borderRadius: "2em",
      marginBottom: "1em",
    },
    player: {
      fontSize: "1.8vw",
      color: "#FFFFFF",
      fontWeight: "300",
      margin: 0,
    },
    playerSubText: {
      fontSize: "0.8rem",
      color: "#FFFFFF",
      fontWeight: "300",
    },
  };
  const [squad, setSquad] = useState({
    homeTeam: [],
    awayTeam: []
  });
  useEffect(() => {
    if (matchData) {
      let homeTeamId = matchData?.localteam_id;
      let awayTeamId = matchData?.visitorteam_id;
      let homeTeam = matchData?.lineup?.filter((elem) => elem.lineup.team_id == homeTeamId);
      let awayTeam = matchData?.lineup?.filter((elem) => elem.lineup.team_id == awayTeamId);
      setSquad({ ...squad, homeTeam, awayTeam })
    }
  }, []);
  return (
    <>
      <div className="col-sm-12" style={styles.mainParentDiv}>
        <div className="col-sm-6" style={styles.teamParent}>
          <div style={{ display: "flex" }}>
            <Avatar
              alt="0"
              sx={{
               
              }}
              src={matchData?.localteam?.image_path}
            />
            <p style={styles.team}> {matchData?.localteam?.name}</p>
          </div>
        </div>
        <div className="col-sm-6" style={styles.teamParent}>
          <div style={{ display: "flex" }}>
            <p style={styles.team}> {matchData?.visitorteam?.name}</p>
            <Avatar
              alt="0"
              sx={{
           
              }}
              src={matchData?.visitorteam?.image_path}
            />
          </div>
        </div>
      </div>
      <div  style={{ backgroundColor: "#23202e" }}>
        <div className="col-sm-12" style={styles.header}>
          <p style={styles.team}>Playing 11</p>
        </div>
        {squad?.homeTeam?.map((elem, index) => {
          return (
            <div
              className=""
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <div
                className="col-sm-6"
                style={{
              
                  borderRight: "solid 0.1em gray",
                   
                }}
              >
                <div style={{ display: "flex",}}>
                <Avatar
                  alt="0"
                  sx={{
                  
                  }}
                  src={elem.image_path}
                />
                <div style={{ paddingLeft: "0.5em" }}>
                  <p  >{elem.fullname}</p>
                  <p style={styles.playerSubText}>{elem?.position?.name}</p>
                </div>
                </div>
               
              </div>
              <div className="col-sm-6">
              <div
                
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                   
                }}
              >
                {/* <div style={{ paddingLeft: "0.5em" }}>
                  <p style={styles.player}>A Hales</p>
                  <p style={styles.playerSubText}>batsman</p>
                </div> */}
                
                <div style={{  display: "flex",  flexDirection: "column",  alignItems: "end"}}>
                  <p  style={{textAlign:"end"}}>{squad?.awayTeam[index]?.fullname}</p>
                  <p style={styles.playerSubText}>{squad?.awayTeam[index]?.position?.name}</p>
                </div>
                <Avatar
                  alt="0"
                
                  src={squad?.awayTeam[index].image_path}
                />
              </div>
              
              </div>
             
            </div>
          );
        })}
      </div>
      {/* <div className="col-sm-12" style={{ backgroundColor: "#0b0817" }}>
        <div className="col-sm-12" style={styles.header}>
          <p style={styles.team}>Bench</p>
        </div>
        {[1, 2, 3, 4, 5].map((e) => {
          return (
            <div
              className="col-sm-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                className="col-sm-6"
                style={{
                  display: "flex",
                  borderRight: "solid 0.1em gray",
                  paddingLeft: "10%",
                }}
              >
                <Avatar
                  alt="0"
                  sx={{
                    width: "4vw",
                    height: "4vw",
                  }}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAYFBMVEX////MAAHp6en///3HAADOAATMREH+/vrNAADMREPSAADCLCnQAAPHb2nMBQXr6+vY2Njq6OTCAADKaWbHKSrEb2zLJijMcmzPLivBHRrFCgjWAAHLQT7DCw2/cWfEKSq1f0FJAAACrUlEQVR4nO3dUXMSMRRA4QQTDWtcKLXVtmj//790gY46HoJPeJnxHAaGN+58k10eNrObtptVSJv70udhtUwfowbbpk0K6lNpcx5UDiZRg23SKuqnb9ZkFWoyIsmll+k1arBIkzzV3M73/5oc1skvh/zbt9w9dv5IE01+pgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJuwht3k+z7KY5PY5arBVuvsQU3porQ6WSmutl8cUNNndovIupMM66WVw7CxUu8eowVZx96z7UvLQZHnvvkYNtkn7dVBPU+mDc2ydF6znqMH2KeeyNPoHuF6lvuxqP38+WUym0Rq6aieKdLi/4PiGetcs5lf/Xj2Z3Op4IdXAdXKracI0YZowTZgmTBOmCdOEacI0YZowTZgmTBOmCdOEacI0YZowTZgmTBOmCdOE1XT4jDBp7dIF4RZ4cbKnGlW7cOW+9ZyniKGOD2xMx2vpIfUL63NZJGFz5bR/H9P66WW8UWnOPX9bB022D9ynNJXWd2dJailTDtvjF/hsze/tOU9Dk5cc8szE0362tz1+6e31z74enzdaB2eT5dA57o8Nmcw9w0wTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGxJvPIpNRQk+0mqPvc50F1Xkxeowbb/gAmD5ZPT09MVgAAAABJRU5ErkJggg=="
                />
                <div style={{ paddingLeft: "0.5em" }}>
                  <p style={styles.player}>R Sharma</p>
                  <p style={styles.playerSubText}>batsman</p>
                </div>
              </div>
              <div
                className="col-sm-6"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "10%",
                }}
              >
                <div style={{ paddingLeft: "0.5em" }}>
                  <p
                    style={{
                      fontSize: "1.8vw",
                      color: "#FFFFFF",
                      fontWeight: "300",
                      margin: 0,
                    }}
                  >
                    R Sharma
                  </p>
                  <p
                    style={{
                      fontSize: "1vw",
                      color: "#FFFFFF",
                      fontWeight: "300",
                    }}
                  >
                    batsman
                  </p>
                </div>
                <Avatar
                  alt="0"
                  sx={{
                    width: "4vw",
                    height: "4vw",
                  }}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAYFBMVEX////MAAHp6en///3HAADOAATMREH+/vrNAADMREPSAADCLCnQAAPHb2nMBQXr6+vY2Njq6OTCAADKaWbHKSrEb2zLJijMcmzPLivBHRrFCgjWAAHLQT7DCw2/cWfEKSq1f0FJAAACrUlEQVR4nO3dUXMSMRRA4QQTDWtcKLXVtmj//790gY46HoJPeJnxHAaGN+58k10eNrObtptVSJv70udhtUwfowbbpk0K6lNpcx5UDiZRg23SKuqnb9ZkFWoyIsmll+k1arBIkzzV3M73/5oc1skvh/zbt9w9dv5IE01+pgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJuwht3k+z7KY5PY5arBVuvsQU3porQ6WSmutl8cUNNndovIupMM66WVw7CxUu8eowVZx96z7UvLQZHnvvkYNtkn7dVBPU+mDc2ydF6znqMH2KeeyNPoHuF6lvuxqP38+WUym0Rq6aieKdLi/4PiGetcs5lf/Xj2Z3Op4IdXAdXKracI0YZowTZgmTBOmCdOEacI0YZowTZgmTBOmCdOEacI0YZowTZgmTBOmCdOE1XT4jDBp7dIF4RZ4cbKnGlW7cOW+9ZyniKGOD2xMx2vpIfUL63NZJGFz5bR/H9P66WW8UWnOPX9bB022D9ynNJXWd2dJailTDtvjF/hsze/tOU9Dk5cc8szE0362tz1+6e31z74enzdaB2eT5dA57o8Nmcw9w0wTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGaME2YJkwTpgnThGnCNGGxJvPIpNRQk+0mqPvc50F1Xkxeowbb/gAmD5ZPT09MVgAAAABJRU5ErkJggg=="
                />
              </div>
            </div>
          );
        })}
      </div> */}
    </>
  );
};
