import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const LiveMatchListingCards = (props) => {
    const liveMatchDetails = useSelector(
        (state) => state.cricketReducer.liveMatchDetails
    );
    const linkString = {
        "Finished Matches": "/finishedmatchpage",
        "Live Matches": "/livematchpage",
        "Fixture Matches": "/fixturematchpage",
        "Upcoming Matches": "/upcomingmatchpage",
    };
    const styles = {
        mainParentDiv: {
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative"
        },
        cardHeaderDiv: {
            display: "flex",
            backgroundColor: "#A62539",
            justifyContent: "space-between",
        },
        cardParentDiv: {
            display: "flex",
            flexDirection: "column",
            marginLeft: 0,
            marginRight: 0,
        },
        card: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#402E51",
            height: "20em",
            boxShadow: "10px 10px 10px black",
            marginBottom: "1em",
            marginTop: "0.5em",
            width: "100%",
            borderRadius: "2em",
            border: "solid #A494E1 0.1em",
        },
        cardHeader: {
            textDecoration: "none",
            color: "#FFFFFF",
            borderBottom: "solid #A494E1 0.1em",
            padding: "1% 0 1%",
        },
        team: {
            display: "flex",
            justifyContent: "space-between",
            padding: "2%",
        },
        textStyles: {
            textDecoration: "none",
            color: "#FFFFFF",
            minWidth: "9em"
        },
        scores: {
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "flex-end",
            maxWidth: "2em"
        },
    };

    return (
        <div style={styles.mainParentDiv}>
            {window.location.pathname !== "/liveMatches" && (
                <div style={styles.cardHeaderDiv} className="col-sm-12">
                    <div>
                        <h1 style={{ color: "white" }}>{props.heading}</h1>
                    </div>
                    <div>
                        <Link to="/">
                            <button style={{ color: "black", background: "none" }}>
                                <h1>Go back</h1>
                            </button>
                        </Link>
                    </div>
                </div>
            )}
            <div className="col-sm-12" style={styles.cardParentDiv}>
                {/* {liveMatchDetails.data.map((e) => { */}
                {/* return ( */}
                <Link to={linkString[props.heading]}>
                    <div className="col-sm-12" style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h4 style={{ textDecoration: "none" }}>
                                ICC Men’s T20 world Cup 2022
                            </h4>
                        </div>
                        <div className="col-sm-12" style={styles.team}>
                            <div classname="col-sm-6">
                                <div className="col-sm-3">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="data:image/png;base64,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"
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <h2 style={styles.textStyles}>India</h2>
                                </div>
                            </div>
                            <div className="col-sm-6" style={styles.scores}>
                                <h3>94/4</h3>
                                <h4>
                                    <sub>(16.4)</sub>
                                </h4>
                            </div>
                        </div>
                        <div className="col-sm-12" style={styles.team}>
                            <div classname="col-sm-6">
                                <div className="col-sm-3">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="data:image/png;base64,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"
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <h2 style={styles.textStyles}>England</h2>
                                </div>
                            </div>
                            <div className="col-sm-6" style={styles.scores}>
                                <h3>128/20</h3>
                                <h4>
                                    <sub>(20)</sub>
                                </h4>
                            </div>
                        </div>
                        <div className="col-sm-12" style={styles.textStyles}>
                            <h4>Projected score: 146 @ 7.2 RPO</h4>
                        </div>
                    </div>
                </Link>
                {/* ); */}
                {/* })} */}
            </div>
        </div>
    );
};
export default LiveMatchListingCards;
