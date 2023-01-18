import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Live = (props) => {

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
    bottomText: { fontSize: "2vw", color: "#FFFFFF", fontWeight: "500" },
    secondCardInnerDiv: {
      display: "flex",
      flexDirection: "row",
    },
  };
  const runs = {
    noruns: {
      fontSize: "1.6vw",
      color: "gray",
      fontWeight: "700",
      padding: "0.5em",
      backgroundColor: "#d9d9d9",
      borderRadius: "50%",
      maxWidth: "18%",
      textAlign: "center",
    },
    w: {
      fontSize: "1.6vw",
      color: "#FFFFFF",
      fontWeight: "700",
      padding: "0.5em",
      backgroundColor: "red",
      borderRadius: "50%",
      maxWidth: "18%",
      textAlign: "center",
    },
    six: {
      fontSize: "1.6vw",
      color: "#FFFFFF",
      fontWeight: "700",
      padding: "0.5em",
      backgroundColor: "#0072dc",
      borderRadius: "50%",
      maxWidth: "18%",
      textAlign: "center",
    },
    four: {
      fontSize: "1.6vw",
      color: "#FFFFFF",
      fontWeight: "700",
      padding: "0.5em",
      backgroundColor: "#009718",
      borderRadius: "50%",
      maxWidth: "18%",
      textAlign: "center",
    },
    anyruns: {
      fontSize: "1.6vw",
      color: "black",
      fontWeight: "700",
      padding: "0.5em",
      backgroundColor: "#d9d9d9",
      borderRadius: "50%",
      maxWidth: "18%",
      textAlign: "center",
    },
  };
  const getRunsStyle = (e) => {
    switch (e) {
      case 0:
        return runs.noruns;
      case "w":
        return runs.w;
      case 4:
        return runs.four;
      case 6:
        return runs.six;
      default:
        return runs.anyruns;
    }
  };

  const cricketReducer = useSelector(state => state.cricketReducer?.currentMatchData);

  const [matchData, setMatchData] = useState(cricketReducer);

  React.useEffect(() => {
    setMatchData(cricketReducer);
  }, [cricketReducer]);


  const [lastBalls, setLastBalls] = useState([]);

  useEffect(() => {
    if (matchData?.balls?.length > 0) {
      let lastBalls = [...matchData?.balls];
      lastBalls = lastBalls.splice(-6)?.reverse();
      lastBalls = lastBalls?.map((elem, key) => {
        if (elem?.score?.is_wicket == true) {
          let catchOutBy = matchData?.lineup?.find(e => e.id == elem.catchstump_id);
          let batsmanOut = matchData?.lineup?.find(e => e.id == elem.batsmanout_id);
          return {
            ...elem,
            catchOutBy,
            batsmanOut
          }
        }
        return {
          ...elem,
          catchOutBy: null,
          batsmanOut: null
        };
      });
      setLastBalls(lastBalls);
    }
  }, [matchData]);

  return (
    <div className="col-sm-12" style={styles.mainParentDiv}>
      {/* row */}
      {
        lastBalls && lastBalls.length > 0 &&
        lastBalls?.map((e) => {
          return (
            <div
              className="col-sm-12"
              style={{ borderBottom: "solid #FFFFFF 0.1em " }}
            >
              <div className="col-sm-12" style={styles.secondCardInnerDiv}>
                <div className="col-sm-3">
                  <p style={styles.bottomText}>{e.ball}</p>
                </div>
                <div className="col-sm-9">
                  <p style={styles.bottomText}>{e.bowler?.fullname} to {e.batsman?.fullname}</p>
                </div>
              </div>
              <div className="col-sm-12" style={styles.secondCardInnerDiv}>
                <div className="col-sm-3">
                  <p style={getRunsStyle(e?.score?.runs)}>{e?.score?.runs}</p>
                </div>
                <div className="col-sm-9">
                  {
                    e.catchOutBy !== null ? <p style={styles.bottomText}>{e?.catchOutBy?.fullname} {e?.score?.name}  {e?.batsmanOut?.fullname}</p> :
                      <p style={styles.bottomText}>{e?.score?.name} </p>
                  }
                </div>
              </div>
            </div>
          );
        })}
    </div >
  );
};
