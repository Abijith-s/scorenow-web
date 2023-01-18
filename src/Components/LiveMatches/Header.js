import React from 'react'
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export const Header = () => {
    const styles = {
        cardHeaderDiv: {
          backgroundColor: "#A62539",
          padding:"1rem",
          display:"flex",
          alignItems:"center",
          color:"#fff"
        }
      };
  return (
    <div style={styles.cardHeaderDiv} >
     <Link to="/">
      <button
        className='back-arrow '
      >
        <ArrowBackRoundedIcon
          sx={{
            "&:hover": { color: "#402E51" },
          }}   
        />
      </button>
    </Link>
    <h4>Live Matches</h4>
  </div>
  )
}
