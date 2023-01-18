import React from "react";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";

export const ScoreCard = (props) => {
  const { currentBowler, data, currentBatsman, supportBatsman } = props;

  const styles = {
    tdStyle: { color: "#FFFFFF", textAlign: "center", fontSize: "1em" },
    thStyle: {
      color: "grey",
      fontWeight: "lighter",
      textAlign: "center",
      fontSize: "2em",
      border: "none",
    },
    playerStyle: {
      color: "#EA95FF",
      display: "flex",
      justifyContent: "flex-start",
    },
    circle1: {
      fontFamily: "Times New Roman",
      display: "flex",
      justifyContent: "center",
      color: "grey",
      alignContent: "center",
      padding: "1%",
      backgroundColor: "#FFFFFF",
      width: "4%",
      borderRadius: "50%",
      height: "20%",
      border: "solid 2% black",
      marginLeft: "0.5em",
      fontWeight: "bold",
    },
    ciecle2: {
      display: "flex",
      justifyContent: "center",
      color: "black",
      alignContent: "center",
      padding: "1%",
      backgroundColor: "#FFFFFF",
      width: "4%",
      borderRadius: "50%",
      height: "20%",
      border: "solid 2% black",
      marginLeft: "0.5em",
    },
    circle3: {
      display: "flex",
      justifyContent: "center",
      color: "#FFFFFF",
      alignContent: "center",
      padding: "1%",
      backgroundColor: "#009718",
      width: "4%",
      borderRadius: "50%",
      height: "20%",
      border: "solid 2% black",
      marginLeft: "0.5em",
    },
    circle4: {
      display: "flex",
      justifyContent: "center",
      color: "grey",
      alignContent: "center",
      padding: "1%",
      backgroundColor: "#FFFFFF",
      width: "4%",
      borderRadius: "50%",
      height: "20%",
      border: "solid 2% black",
      marginLeft: "0.5em",
      fontWeight: "bold",
    },
  };
  return (
    <>
      <div className="col-sm-12" style={{ padding: "2% 5% 1%" }}>
        <table class="table table-dark">
          <thead>
            <tr>
              <th
                scope="col"
                className="col-sm-7"
                style={{
                  color: "grey",
                  fontWeight: "lighter",
                  fontSize: "2em",
                  border: "none",
                }}
              >
                Batter
              </th>
              <th scope="col" className="col-sm-1" style={styles.thStyle}>
                R
              </th>
              <th scope="col" className="col-sm-1" style={styles.thStyle}>
                B
              </th>
              <th scope="col" className="col-sm-1" style={styles.thStyle}>
                4s
              </th>
              <th scope="col" className="col-sm-1" style={styles.thStyle}>
                6s
              </th>
              <th scope="col" className="col-sm-1" style={styles.thStyle}>
                SR
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-sm-6" style={styles.playerStyle}>
                <h2>
                  {currentBatsman?.name || "Unknown"} <SportsCricketIcon sx={{ fontSize: "70%" }} />{" "}
                </h2>
              </td>
              <td style={styles.tdStyle}>{currentBatsman?.score}</td>
              <td style={styles.tdStyle}>{currentBatsman?.ball}</td>
              <td style={styles.tdStyle}>{currentBatsman?.four_x}</td>
              <td style={styles.tdStyle}>{currentBatsman?.six_x}</td>
              <td style={styles.tdStyle}>{currentBatsman?.rate}</td>
            </tr>
            <tr>
              <td className="col-sm-6" style={styles.playerStyle}>
                <h2>
                  {supportBatsman?.name || "Unknown"} <SportsCricketIcon sx={{ fontSize: "70%" }} />{" "}
                </h2>
              </td>
              <td style={styles.tdStyle}>{supportBatsman?.score}</td>
              <td style={styles.tdStyle}>{supportBatsman?.ball}</td>
              <td style={styles.tdStyle}>{supportBatsman?.four_x}</td>
              <td style={styles.tdStyle}>{supportBatsman?.six_x}</td>
              <td style={styles.tdStyle}>{supportBatsman?.rate}</td>
            </tr>
          </tbody>
          {
            currentBowler &&
            <>
              <thead style={{ border: "none" }}>
                <tr style={{ border: "none" }}>
                  <th
                    className="col-sm-6"
                    style={{
                      color: "grey",
                      fontWeight: "lighter",
                      fontSize: "2em",
                      border: "none",
                    }}
                  >
                    Bowler
                  </th>
                  <th className="col-sm-1" style={styles.thStyle}>
                    O
                  </th>
                  <th className="col-sm-1" style={styles.thStyle}>
                    M
                  </th>
                  <th className="col-sm-1" style={styles.thStyle}>
                    R
                  </th>
                  <th className="col-sm-1" style={styles.thStyle}>
                    W
                  </th>
                  <th className="col-sm-1" style={styles.thStyle}>
                    ER
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-sm-6" style={styles.playerStyle}>
                    <h2>{currentBowler?.name || "Unknown"}</h2>
                  </td>
                  <td style={styles.tdStyle}>{currentBowler?.overs || 0}</td>
                  <td style={styles.tdStyle}>0</td>
                  <td style={styles.tdStyle}>{currentBowler?.score || 0}</td>
                  <td style={styles.tdStyle}>{currentBowler?.wickets || 0}</td>
                  <td style={styles.tdStyle}>5.6</td>
                </tr>
              </tbody>
            </>
          }
        </table>
      </div>
      <div className="col-xs-12" style={{ padding: "2%" }}>
        <div className="col-xs-2" style={styles.circle1}>
          <h4>0</h4>
        </div>
        <div className="col-xs-2" style={styles.ciecle2}>
          <h4>1</h4>
        </div>
        <div className="col-xs-2" style={styles.circle3}>
          <h4>4</h4>
        </div>
        <div className="col-xs-2" style={styles.circle4}>
          <h4>0</h4>
        </div>
      </div>
    </>
  );
};
