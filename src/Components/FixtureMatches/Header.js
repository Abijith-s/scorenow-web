import React from 'react'
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export const Header = () => {
    const styles = {
        cardHeaderDiv: {
          backgroundColor: "#A62539"
        }
      };
  return (
    <div style={styles.cardHeaderDiv} className="col-sm-12">
        <div className="col-sm-1" style={{padding:0,display:"flex",justifyContent:"flex-start"}}>
          <Link to="/">
            <button
              style={{ color: "#FFFFFF", background: "none", border: "none" }}
            >
              <ArrowBackRoundedIcon sx={{ fontSize: "2em",marginTop:"0.2em","&:hover":{color:"#402E51"} }} />
            </button>
          </Link>
        </div>
        <div className="col-sm-11"  style={{padding:0,display:"flex",justifyContent:"flex-start"}}>
          <h1 style={{ color: "white", padding: 0 }}>Fixture Matches</h1>
        </div>
      </div>
  )
}
