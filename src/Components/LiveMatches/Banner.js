import React from "react";

export const Banner = () => {
  const styles = {
    team: {
      maxHeight: "60%",
      padding: 0,
    },
    logoStyle: {
      height: "100%",
      width: "100%",
    },
    imageContainer: { display: "flex", justifyContent: "center" },
    matchDetailsParent: { display: "flex", justifyContent: "space-between" },
    abbrevation: {
      color: "#FFFFFF",
      texAlign: "center",
      display: "inline-block",
      minWidth: "5%",
      wordBreak: "break-all",
    },
    viewButton: {
      padding: "4%",
      borderRadius: "0.6em",
      backgroundColor: "#E6C700",
      border: "none",
    },
  };
  return (
    <>
      <div
        className="container col-sm-12"
        style={{ height: "50%", width: "100%" ,position:"relative"}}
      >
        <div className="col-sm-4" style={styles.team}>
          <img alt="img1" src="../images/logo.png" style={styles.logoStyle} />
        </div>
        <div className="col-sm-4">
          <div className="col-sm-12" style={styles.imageContainer}>
            <img
              alt="img1"
              src="../images/logo.png"
              style={{ height: "30%", width: "30%" }}
            />
          </div>
          <div className="col-sm-12" style={styles.matchDetailsParent}>
            <div className="col-sm-4" style={{ backgroundColor: "#292472" }}>
              <h1 style={styles.abbrevation}>IND</h1>
            </div>
            <div className="col-sm-4" style={{ backgroundColor: "#2C798F" }}>
              <h1 style={styles.abbrevation}>ENG</h1>
            </div>
          </div>
          <div className="col-sm-12">
            <h3 style={{ color: "#FFFFFF", textAlign: "center" }}>
              India won the toss and chose to bowl
            </h3>
          </div>
          <div
            className="col-sm-12"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button style={styles.viewButton}>
              <strong> View Now</strong>
            </button>
          </div>
        </div>
        <div className="col-sm-4" style={styles.team}>
          <img alt="img1" src="../images/logo.png" style={styles.logoStyle} />
        </div>
      </div>
    </>
  );
};
