import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { getFinishedMatchesUpdates } from "../../apiManager/services/cricketServices";

const FinishedMatchListingCards = (props) => {
  const dispatch = useDispatch();
  const finishedMatchDetails = useSelector(
    (state) => state.cricketReducer.finishedMatchDetails
  );
  useEffect(() => {
    dispatch(getFinishedMatchesUpdates());
  }, []);

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

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join(" ");
  }
  return (
    <div className="card-flex-column">
      {finishedMatchDetails ? (
        finishedMatchDetails?.map((e, index) => {
          return (
            <>
              {e.homeTeamName && (
                <div className="each-row">
                  <div className="card-topper">
                    <span>{e.note}</span>
                    <span>{formatDate(e.date)}</span>
                  </div>
                  <div className="card-row">
                    <div className="card-row-item">
                      <Avatar
                        alt="Remy Sharp"
                        sx={{
                          display: "inline",
                          marginRight: "10px",
                        }}
                        src={e.homeTeamLogo}
                      />
                      <h4 className="team-name">{e.homeTeamName}</h4>
                      <div>
                        ({e.homeTeamScore?.score}/{e.homeTeamScore?.wicket}-
                        {e.homeTeamScore?.overs})
                      </div>
                    </div>
                    <h2>vs</h2>

                    <div className="card-row-item card-flex-end">
                      <h4 className="team-name">{e.awayTeamName}</h4>(
                      {e.awayTeamScore?.score}/{e.awayTeamScore?.wicket}-
                      {e.awayTeamScore?.overs})
                      <Avatar
                        alt="Remy Sharp"
                        sx={{
                          display: "inline",
                          marginLeft: "10px",
                        }}
                        src={e.awayTeamLogo}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })
      ) : (
        <h2>no match found</h2>
      )}
    </div>
  );
};
export default FinishedMatchListingCards;