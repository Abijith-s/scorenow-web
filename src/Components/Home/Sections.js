import * as React from 'react';
 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';

const URL = ["liveMatches","finishedMatches","leagues","ranking","upcomingMatches",]
const URLText = ["Live Matches","Finished Matches","Leagues","Ranking","Upcoming Matches",]

export default function CarouselRatio() {
    const navigate = useNavigate()
  return (
  <>
       <Box sx={{ flexGrow: 1 }}>
       <Grid container  columns={{ xs: 4, sm: 8, md: 10 }}>
        {
            URL.map((url,ind)=>{
                return <Grid item xs={ind === URL.length-1 ? 12 : 2} sm={ind === URL.length-1 ? 12 : 4} md={2} onClick={()=>{navigate(`/${url}`)}} style={{cursor:"pointer"}}>
                <div className={`each-section ${ind % 2 === 0 ?"secondary":"primary"}`}>
                     {URLText[ind].toUpperCase()}
                 </div>
                </Grid>
            })
        }
        
       </Grid>
     </Box>
     </>
  );
}