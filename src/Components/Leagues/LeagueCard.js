import { Avatar, Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeagues } from "../../apiManager/services/cricketServices";

export const LeagueCard = () => {
  const leagues = useSelector((state) => state.cricketReducer.leagues);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getLeagues());
  },[])
 
  return (
    <Box sx={{ flexGrow: 1 }} style={{backgroundColor:"#000"}}>
      <Grid container columns={{ xs: 12, sm: 12, md: 12 }} >
        {leagues.map((e, ind) => {
          return (
            <Grid
            key={ind}
              item
              xs={12}
              sm={6}
              md={4}

           
              style={{ cursor: "pointer", padding:"1rem"}}
            >
              <div
               className="each-section secondary"
               style={{display:"flex", alignItems:"center", wordBreak:"break-word"}}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={e.icon}
                  sx={{
                    display: "inline",
                    marginRight:"5px",
                    border:"2px solid #ffff"
                  }}
                />
                <h4>{e.league}</h4>
                
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
