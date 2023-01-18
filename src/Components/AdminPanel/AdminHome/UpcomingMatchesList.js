import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUpcomingMatches } from "../../../apiManager/services/adminServices";

export const UpcomingMatchesList = () => {
  const dispatch = useDispatch();
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
  const styles = {
    textStyles: {
      fontSize: "1.3vw",
      marginBottom: "1%",
      fontWeight: 800,
      marginRight:"1vw"
    },
  };
  useEffect(() => {
    dispatch(getAdminUpcomingMatches());
  }, []);
  const upcomingMatchDetails = useSelector(
    (state) => state.adminReducer?.upcomingMatches?.data
  );
  return (
    <div style={{ justifyContent: "center" }}>
      <h3 style={{ textAlign: "center" }}>Upcoming Match List</h3>

      <div
        style={{
          display: "flex",
          justifyContent:"center",
        }}
        className="col-sm-12"
      >
        <>
          <table style={{tableLayout:"fixed"}}>
            <tbody>
              {upcomingMatchDetails &&
                upcomingMatchDetails?.map((e, index) => {
                  return (
                    <tr>
                      <td>
                        <p style={styles.textStyles}>{e.matchId}</p>
                      </td>
                      <td>
                        <p style={styles.textStyles}>{e.homeTeamName}</p>
                      </td>
                      <td>
                        <p style={styles.textStyles}>VS</p>
                      </td>
                      <td>
                        <p style={styles.textStyles}>{e.awayTeamName}</p>
                      </td>
                      <td>
                        <p style={styles.textStyles}>{formatDate(e.date)}</p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
};
