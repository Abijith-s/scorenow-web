import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

const UpcomingMatchListingCards = (props) => {
  const upcomingMatchDetails = useSelector(
    (state) => state.cricketReducer?.upcomingMatchDetails
  );

  upcomingMatchDetails?.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date);
  });

  function formatDate(date) {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

    var d = new Date(date),
      day = "" + d.getDate(),
      month = "" + months[d.getMonth()],
      year = d.getFullYear();

    var time = date.split("T");
    var time1 = time[1].split(".")[0];
    var time2 = time1.split(":");
    var hour = parseInt(time2[0]);
    var min = time2[1];
    var hours = hour;
    var mid = "am";
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (hour === 0) {
      //At 00 hours we need to show 12 am
      hours = 12;
    } else if (hours > 12) {
      hours = hours % 12;
      mid = "pm";
    } else if (hours === 12) {
      hours = 12;
      mid = "pm";
    }
    return [month, day, year, hours, ":", min, mid].join(" ");
  }

  return (
    <>
      <div className="card-flex-column" >
        {upcomingMatchDetails? upcomingMatchDetails?.map((e,index)=>{
          return(
            <div className="each-row">
            <div className="card-topper">
              <span>{e.type}</span>
              <span>{formatDate(e.date)}</span>
            </div>
            <div className="card-row">
              <div className="card-row-item">
                <Avatar
                  alt="Remy Sharp"
                  sx={{
                    display: "inline",
                    marginRight:"10px"

                  }}
                  src={e.homeTeamLogo}
                />
                <h4 className="team-name">{e.homeTeamName}</h4>
              </div>
              <h2>vs</h2>
  
              <div className="card-row-item card-flex-end">
              <h4 className="team-name">{e.awayTeamName}</h4>
                <Avatar
                  alt="Remy Sharp"
                  sx={{
                    display: "inline",
                    marginLeft:"10px"
                  }}
                  src={e.awayTeamLogo}
                />
              </div>
            </div>
          </div>
          )
        }):<h2>no match found</h2>
        }
       
      </div>
    </>
  );
};
export default UpcomingMatchListingCards;