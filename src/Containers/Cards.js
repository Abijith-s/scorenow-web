import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { SocketContext } from "../Context/SocketContext";
import {
  setLiveMatchDetails,
  setMatchId,
} from "../actions/cricketDetailActions";

const Cards = (props) => {
  const { socket, triggered } = useContext(SocketContext);

  const [matches, setMatches] = useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    socket.emit("live_match", "all");
    socket.on("live_match_data", (data) => {
      data = JSON.parse(data);
      if (data.length > 0) {
        dispatch(setLiveMatchDetails(data));
      } else if (data.length == 0) {
        dispatch(setLiveMatchDetails([]));
      }
    });
  }, [triggered]);

  const liveMatchDetails = useSelector(
    (state) => state.cricketReducer.liveMatchDetails
  );

  useEffect(() => {
    console.log("updated: ", liveMatchDetails);
  }, [liveMatchDetails])

  console.log("live match lenht",liveMatchDetails.length);
  // React.useEffect(() => {
  //   console.log("updated Match");
  //   console.log(matches);
  // }, [matches]);


  // const linkString = {
  //   "Finished Matches": "/finishedmatchpage",
  //   "Live Matches": "/livematchpage",
  //   "Fixture Matches": "/fixturematchpage",
  //   "Upcoming Matches": "/upcomingmatchpage",
  // };

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
      justifyContent: "center",
      flexDirection: "column",
      marginLeft: 0,
      marginRight: 0,
    },
    card: {
      display: "flex",
      flexDirection: "column",
      // backgroundColor: "#402E51",
      height: "auto",
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
      paddingLeft: "0.2em",
      display: "inline",
      fontSize: "2vw",
    },
    scores: {
      color: "#FFFFFF",
      display: "flex",
      justifyContent: "flex-end",
      maxWidth: "2em",
    },
  };

  const navigate = useNavigate();

  const handleToMatch = (matchId) => {
    dispatch(setMatchId(matchId));
    navigate("/livematchpage");
  };

  return (
    <div>
      {window.location.pathname !== "/liveMatches" && (
        <div style={styles.cardHeaderDiv} className="col-sm-12">
          <div>
            <h1 style={{ color: "white" }}>{props.heading}</h1>
          </div>
          <div>
            <Link to="/">
              <button style={{ color: "black", background: "none" }}>
                <h1>Go back</h1>
              </button>
            </Link>
          </div>
        </div>
      )}
      
        {
          liveMatchDetails.length ?
          (<div className="card-flex-column"  style={{minHeight:"90vh"}}>
          {/* {liveMatchDetails.data.map((e) => { 
          return ( */}
          {liveMatchDetails &&
            liveMatchDetails?.map((elem, index) => {
               
              return (
                <div
                  className="each-row"
                  style={{cursor:"pointer" }}
                  onClick={() => handleToMatch(elem?.id)}
                >
                   <div className="card-topper">
                    <span> {elem?.league?.name}</span>
                     
                  </div>
 
                  <div className="card-row">
                    <div class="card-row-item">
                    <Avatar
                              alt="Remy Sharp"
                              src={elem?.localteam?.image_path}
                              sx={{
                                display: "inline",
                               
                                marginRight: "10px"
                              }}
                            />
                     <h2  >{elem?.localteam?.name}</h2>
                            {
                              elem?.runs && elem?.runs[0]?.team_id === elem?.localteam?.id ?
                                <>
                                  <h3 >[{elem?.runs[0]?.score}/{elem?.runs[0]?.wickets}</h3>
                                  <h3 >]</h3>
                                  <h5 >{elem?.runs[0]?.overs}</h5>
                                </>
                                :
                                <>
                                  {elem.runs && elem.runs[1] &&
                                    <>
                                      <h3 >[{elem?.runs[1]?.score}/{elem?.runs[1]?.wickets}</h3>
                                      <h3 >]</h3>
                                      <h5 >{elem?.runs[1]?.overs}</h5>
                                    </>
                                  }

                                </>
                            }

                        </div>
                        <h2>vs</h2>
                        <div className="card-row-item card-flex-end">
                        <h2>{elem?.visitorteam?.name}</h2>
                            {
                              elem?.runs && elem?.runs[0] && elem?.runs[0]?.team_id === elem?.visitorteam?.id ?
                                <>
                                  <h3 >[{elem?.runs[0]?.score}/{elem?.runs[0]?.wickets}</h3>
                                  <h3 >]</h3>
                                  <h5 >{elem?.runs[0]?.overs}</h5>
                                </>
                                :

                                <>
                                  {elem?.runs && elem?.runs[1] &&
                                    <>
                                      <h3 >[{elem?.runs[1]?.score}/{elem?.runs[1]?.wickets}</h3>
                                      <h3 >]</h3>
                                      <h5 >{elem?.runs[1]?.overs}</h5>
                                    </>
                                  }

                                </>
                            }
                            <Avatar
                              alt="Remy Sharp"
                              sx={{
                                display: "inline",
                               
                                marginLeft: "10px"
                              }}
                              src={elem?.visitorteam?.image_path}
                            />
                        </div>
                       
                    
                     
                  </div>
                </div>
              );
            })}
          {/* )}         */}
        </div>) : <div className="container" style={{textAlign:'center',marginTop:'10rem'}}>
          <h1>No Live Matches For Now</h1>
          </div>}

        {/* ); */}
        {/* })} */}
    
    </div>
  );
};
export default Cards;
