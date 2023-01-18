import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useSelector } from "react-redux";

export const ScoreBoard = (props) => {
  const cricketReducer = useSelector(
    (state) => state.cricketReducer?.currentMatchData
  );

  const [matchData, setMatchData] = useState(cricketReducer);

  React.useEffect(() => {
    setMatchData(cricketReducer);
  }, [cricketReducer]);

  //const [lastBalls, setLastBalls] = useState([]);

  const [isShow, setIsShow] = useState(false);
  const styles = {
    scoreBoardParentDiv: { display: "flex", justifyContent: "center" },
    hideDiv: { padding: "2%", display: "none" },
    showDiv: { padding: "10px", display: "block" },
    tdStyle: { color: "#FFFFFF", textAlign: "center", fontSize: "1vw" },
    extrasValueStyle: { color: "#FFFFFF", fontSize: "1vw" },
    thStyle: {
      color: "#FFFFFF",
      fontWeight: "lighter",
      textAlign: "center",
      border: "none",
      fontSize: "1rem",
    },
    extrasStyle: {
      color: "#FFFFFF",
      fontWeight: "lighter",
      textAlign: "center",
      border: "none",
      fontSize: "1.3vw",
      display: "flex",
      justifyContent: "flex-start",
    },
    playerStyle: {
      color: "#EA95FF",
      display: "flex",
      justifyContent: "flex-start",
      wordBreak: "break-all",
      flexDirection: "column",
    },
    playerSubText: {
      color: "#FFFFFF",
      fontWeight: "lighter",
      fontSize: "1.5vw",
      wordBreak: "break-all",
    },
    dropdownBar: {
      backgroundColor: `${props.bandColor}`,
      height: "1%",
      width: "100%",
      borderRadius: "0.5vw",
    },
    teamName: { display: "flex", justifyContent: "flex-start" },
    arrowButton: { color: "#FFFFFF", background: "none", border: "none" },
    arrowButtonSecond: {
      color: "#FFFFFF",
      background: "none",
      border: "none",
      display: "none",
    },
    iconStyle: {
      fontSize: "3vw",
      color: "#FFFFF",
      "&:hover": { color: "#DF3843" },
    },
    tableHeader: { border: "none", backgroundColor: "#65636D" },
    lighterText: {
      color: "#FFFFFF",
      fontWeight: "lighter",
      fontSize: "2vw",
    },
    batterBowlerStyle: {
      color: "#FFFFFF",
      fontWeight: "lighter",
      fontSize: "2vw",
      border: "none",
    },
  };

  const [scoreBoards, setScoreBoards] = useState({
    homeTeamBattings: [],
    awayTeamBattings: [],
    homeTeamBowlings: [],
    awayTeamBowlings: [],
    homeTeamExtras: {},
    awayTeamExtras: {},
    homeTeamYetToBat: [],
    awayTeamYetToBat: [],
  });

  useEffect(() => {
    if (matchData) {
      let homeTeamId = matchData?.localteam_id;
      let awayTeamId = matchData?.visitorteam_id;
      let homeTeamBattings = matchData?.batting?.filter(
        (elem) => elem.team_id === homeTeamId
      );

      homeTeamBattings = homeTeamBattings?.map((e) => {
        if (e.bowling_player_id || e.catch_stump_player_id) {
          let lastBall = [...matchData.balls];
          lastBall = lastBall
            ?.reverse()
            .find((el) => el?.batsmanout_id == e?.player_id);
          let catchOutBy = matchData?.lineup?.find(
            (e) => e.id == lastBall?.catchstump_id
          )?.fullname;
          let message = lastBall?.score?.name.includes("Catch")
            ? "c"
            : lastBall?.score?.name;
          if (catchOutBy) {
            return {
              ...e,
              outMessage: `${message} ${catchOutBy} b ${lastBall?.bowler?.fullname}`,
            };
          } else {
            return {
              ...e,
              outMessage: `${message} b ${lastBall?.bowler?.fullname}`,
            };
          }
        } else return { ...e, outMessage: null };
      });
      const homeTeamBowlings = matchData?.bowling?.filter(
        (elem) => elem.team_id === homeTeamId
      );
      let awayTeamBattings = matchData?.batting?.filter(
        (elem) => elem.team_id === awayTeamId
      );

      awayTeamBattings = awayTeamBattings?.map((e) => {
        if (e.bowling_player_id || e.catch_stump_player_id) {
          let lastBall = [...matchData.balls];
          lastBall = lastBall
            ?.reverse()
            .find((el) => el?.batsman.id == e?.player_id);
          let catchOutBy = matchData?.lineup?.find(
            (e) => e.id == lastBall?.catchstump_id
          )?.fullname;
          let message = lastBall?.score?.name.includes("Catch")
            ? "c"
            : lastBall?.score?.name;
          if (catchOutBy) {
            return {
              ...e,
              outMessage: `${message} ${catchOutBy} b ${lastBall?.bowler?.fullname}`,
            };
          } else {
            return {
              ...e,
              outMessage: `${message} b ${lastBall?.bowler?.fullname}`,
            };
          }
        } else
          return {
            ...e,
            outMessage: null,
          };
      });
      const awayTeamBowlings = matchData?.bowling?.filter(
        (elem) => elem.team_id === awayTeamId
      );

      const homeTeamExtras = matchData?.scoreboards?.find(
        (elem) => elem.team_id === homeTeamId && elem.type === "extra"
      );
      const awayTeamExtras = matchData?.scoreboards?.find(
        (elem) => elem.team_id === awayTeamId && elem.type === "extra"
      );

      if (homeTeamExtras?.bye == 0 || homeTeamExtras?.bye > 0) {
        homeTeamExtras.total =
          homeTeamExtras?.bye +
          homeTeamExtras?.leg_bye +
          homeTeamExtras?.noball_runs +
          homeTeamExtras?.penalty +
          homeTeamExtras?.wide;
      }
      if (awayTeamExtras?.bye == 0 || awayTeamExtras?.bye > 0) {
        awayTeamExtras.total =
          awayTeamExtras?.bye +
          awayTeamExtras?.leg_bye +
          awayTeamExtras?.noball_runs +
          awayTeamExtras?.penalty +
          awayTeamExtras?.wide;
      }
      const isHomeTeamBatting =
        matchData?.yetToBat &&
        matchData?.yetToBat[0]?.lineup?.team_id === homeTeamId;

      if (isHomeTeamBatting) {
        setScoreBoards({
          ...scoreBoards,
          homeTeamBattings,
          awayTeamBattings,
          homeTeamBowlings,
          awayTeamBowlings,
          homeTeamExtras,
          awayTeamExtras,
          homeTeamYetToBat: matchData?.yetToBat,
        });
      } else {
        setScoreBoards({
          ...scoreBoards,
          homeTeamBattings,
          awayTeamBattings,
          homeTeamBowlings,
          awayTeamBowlings,
          homeTeamExtras,
          awayTeamExtras,
          awayTeamYetToBat: matchData?.yetToBat,
        });
      }

    }
  }, [matchData]);

  return (
    <>
      <div className="col-sm-12" style={styles.scoreBoardParentDiv}>
        <div className="col-sm-12" style={styles.dropdownBar}>
         
          <div
            className="justify-content-between p-3"
            style={{ display: "flex",  alignItems:"center",}}
          >
              <h1 style={{ color: "#FFFFFF" }}>{matchData?.localteam?.name}</h1>
            <button
              onClick={() => setIsShow(!isShow)}
              style={styles.arrowButton}
            >
              {isShow ? (
                <ExpandLessIcon   />
              ) : (
                <ExpandMoreIcon  />
              )}
            </button>
          </div>
          <div
            className="col-sm-12 "
            style={isShow ? styles.showDiv : styles.hideDiv}
          >
            <div className="col-sm-12 table-responsive" style={{ padding: 0 }}>
              <table class="table table-dark ">
                <thead style={{ backgroundColor: "#463853" }}>
                  <tr>
                    <th
                      scope="col"
                      className="col-sm-7"
                     
                    >
                      Batter
                    </th>
                    <th scope="col" className="col-sm-1"  >
                      R
                    </th>
                    <th scope="col" className="col-sm-1"  >
                      B
                    </th>
                    <th scope="col" className="col-sm-1"  >
                      4s
                    </th>
                    <th scope="col" className="col-sm-1" >
                      6s
                    </th>
                    <th scope="col" className="col-sm-1"  >
                      SR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoreBoards?.homeTeamBattings?.map((elem, index) => {
                    return (
                      <tr style={{ borderBottom: "solid 0.1em #A494E1" }}>
                        <td className="col-md-6 d-flex" style={{flexDirection:"column" , fontSize:"1.3rem"}} >
                          <p>{elem?.batsman?.fullname}</p>
                          
                         <span style={{fontSize:"0.8rem",marginTop:"-10px"}}>{elem?.outMessage == null
                            ? "not out"
                            : elem?.outMessage}</span>
                        </td>
                        <td  >{elem?.score}</td>
                        <td >{elem?.ball}</td>
                        <td >{elem?.four_x}</td>
                        <td >{elem?.six_x}</td>
                        <td >{elem?.rate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              className="col-sm-12"
              style={{
                display: "flex",
                flexWrap:"wrap",
                justifyContent: "space-between",
                borderBottom: "solid 0.1em #A494E1",
              }}
            >
                <p
                  style={{
                    color: "grey",
                    fontWeight: "lighter",
                    fontSize:"1.3rem"
                  }}
                >
                  EXTRAS
                </p>
                <p style={{fontSize:"1.3rem"}}>
                  {scoreBoards?.homeTeamExtras?.total}
                </p>
                <p style={{fontSize:"1.3rem"}} >
                  (b {scoreBoards?.homeTeamExtras?.bye}, lb{" "}
                  {scoreBoards?.homeTeamExtras?.leg_bye}, nb{" "}
                  {scoreBoards?.homeTeamExtras?.noball_runs}, w{" "}
                  {scoreBoards?.homeTeamExtras?.wide}, p{" "}
                  {scoreBoards?.homeTeamExtras?.penalty})
                </p>
             
              
             
               
            </div>
            {scoreBoards.homeTeamYetToBat.length > 0 && (
              <div className="col-sm-12 d-flex flex-sm-column flex-md-row flex-wrap justify-content-between p-2 mt-3">
                 
                  <p
                    style={{
                      color: "grey",
                      fontWeight: "lighter",
                      fontSize: "1.3rem",

                    }}
                  >
                    Yet To Bat
                  </p>
                  <p  >
                    {scoreBoards?.homeTeamYetToBat?.map((elem, index) => {
                      return (
                        <>
                          {elem?.fullname}
                          {scoreBoards?.homeTeamYetToBat?.length - 1 !==
                            index && <>, </>}
                        </>
                      );
                    })}
                  </p>
                 
                
              </div>
            )}

            <div className="col-sm-12  table-responsive" style={{ padding: 0 }}>
              <table class="table table-dark">
                <thead style={{ backgroundColor: "#463853" }}>
                  <tr style={{ border: "none" }}>
                    <th className="col-sm-6" >
                      Bowler
                    </th>
                    <th className="col-sm-1" >
                      O
                    </th>
                    <th className="col-sm-1" >
                      M
                    </th>
                    <th className="col-sm-1" >
                      R
                    </th>
                    <th className="col-sm-1" >
                      W
                    </th>
                    <th className="col-sm-1" >
                      ER
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoreBoards?.homeTeamBowlings?.map((elem, index) => {
                    return (
                      <tr style={{ borderBottom: "solid 0.1em #A494E1" }}>
                        <td className="col-md-6 d-flex" style={{flexDirection:"column" , fontSize:"1.3rem"}}>
                          <p>{elem?.bowler?.fullname}</p>
                          
                        </td>
                        <td >{elem.overs}</td>
                        <td >{elem.medians}</td>
                        <td >{elem.runs}</td>
                        <td >{elem.wickets}</td>
                        <td >{elem.rate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="col-sm-12 mt-3" style={styles.scoreBoardParentDiv}>
        <div className="col-sm-12" style={styles.dropdownBar}>
          <div className="col-sm-3" style={styles.teamName}>
            <h1 style={{ color: "#FFFFFF" }}>{matchData?.visitorteam?.name}</h1>
          </div>
          <div className="col-sm-7"></div>
          <div
            className="col-sm-12"
            style={isShow ? styles.showDiv : styles.hideDiv}
          >
            <div className="col-sm-12  table-responsive" style={{ padding: 0 }}>
              <table class="table table-dark">
                <thead style={{ backgroundColor: "#463853" }}>
                  <tr>
                    <th
                      scope="col"
                      className="col-sm-7"
                      
                    >
                      Batter
                    </th>
                    <th scope="col" className="col-sm-1">
                      R
                    </th>
                    <th scope="col" className="col-sm-1">
                      B
                    </th>
                    <th scope="col" className="col-sm-1">
                      4s
                    </th>
                    <th scope="col" className="col-sm-1">
                      6s
                    </th>
                    <th scope="col" className="col-sm-1">
                      SR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoreBoards?.awayTeamBattings?.map((elem, index) => {
                    return (
                      <tr style={{ borderBottom: "solid 0.1em #A494E1" }}>
                        <td className="col-md-6 d-flex" style={{flexDirection:"column" , fontSize:"1.3rem"}}>
                          <p>{elem?.batsman?.fullname}</p>
                        
                          <span style={{fontSize:"0.8rem",marginTop:"-10px"}}>
                          {elem?.outMessage == null
                            ? "not out"
                            : elem?.outMessage}
                          </span>
                        </td>
                        <td >{elem.score}</td>
                        <td >{elem.ball}</td>
                        <td >{elem.four_x}</td>
                        <td >{elem.six_x}</td>
                        <td >{elem.rate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              className="col-sm-12"
              style={{
                display: "flex",
                flexWrap:"wrap",
                justifyContent: "space-between",
                borderBottom: "solid 0.1em #A494E1",
              }}
            >
             <p
                  style={{
                    color: "grey",
                    fontWeight: "lighter",
                    fontSize: "1.3rem",
                  }}
                >
                  EXTRAS
                </p>
                <p  style={{fontSize:"1.3rem"}}>
                  {scoreBoards?.awayTeamExtras?.total}
                </p>
                <p style={{fontSize:"1.3rem"}} >
                  (b {scoreBoards?.awayTeamExtras?.bye}, lb{" "}
                  {scoreBoards?.awayTeamExtras?.leg_bye}, nb{" "}
                  {scoreBoards?.awayTeamExtras?.noball_runs}, w{" "}
                  {scoreBoards?.awayTeamExtras?.wide}, p{" "}
                  {scoreBoards?.awayTeamExtras?.penalty})
                </p>
              
            </div>
            {scoreBoards?.awayTeamYetToBat?.length > 0 && (
              <div className="col-sm-12 d-flex flex-sm-column flex-md-row flex-wrap justify-content-between p-2 mt-3">
                 <p
                    style={{
                      color: "grey",
                      fontWeight: "lighter",
                      fontSize: "1.3rem",

                    }}
                  >
                    Yet To Bat
                  </p>
                
                  <p  >
                    {scoreBoards?.awayTeamYetToBat?.map((elem, index) => {
                      return (
                        <>
                          {elem?.fullname}
                          {scoreBoards?.awayTeamYetToBat?.length - 1 !==
                            index && <>, </>}
                        </>
                      );
                    })}
                  </p>
              </div>
            )}

            <div className="col-sm-12 table-responsive" style={{ padding: 0 }}>
              <table class="table table-dark">
                <thead style={{ backgroundColor: "#463853" }}>
                  <tr style={{ border: "none" }}>
                    <th className="col-sm-6"  >
                      Bowler
                    </th>
                    <th className="col-sm-1">
                      O
                    </th>
                    <th className="col-sm-1">
                      M
                    </th>
                    <th className="col-sm-1">
                      R
                    </th>
                    <th className="col-sm-1">
                      W
                    </th>
                    <th className="col-sm-1">
                      ER
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoreBoards?.awayTeamBowlings?.map((elem, index) => {
                    return (
                      <tr style={{ borderBottom: "solid 0.1em #A494E1" }}>
                        <td className="col-md-6 d-flex" style={{flexDirection:"column" , fontSize:"1.3rem"}}>
                          <p>{elem?.bowler?.fullname}</p>
                          
                        </td>
                        <td >{elem.overs}</td>
                        <td >{elem.medians}</td>
                        <td >{elem.runs}</td>
                        <td >{elem.wickets}</td>
                        <td >{elem.rate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
