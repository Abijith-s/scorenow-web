import { AppBar, Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import {
  setCurrentMatchData,
  setLiveMatchDetails,
} from "../actions/cricketDetailActions";
import { SocketContext } from "../Context/SocketContext";
import { ChatWindow } from "./ChatWindow";
import { Info } from "./Info";
import { Live } from "./Live";
import { MatchCardBanner } from "./MatchCardBanner";
import { ScoreBoard } from "./ScoreBoard";
import { ScoreCard } from "./ScoreCard";
import { Squad } from "./Squad";
import { useTheme } from "@mui/material/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const MatchCard = () => {
  const { socket, triggered } = useContext(SocketContext);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [category, setCategory] = React.useState(0);
  const indexs = [0, 1, 2];
  const TYPES = ["TEST", "ODI", "T20I"];

  const { currentMatchId, liveMatchDetails } = useSelector(
    (state) => state.cricketReducer
  );
 
  // const { matchId } = useParams();
  // console.log(matchId);
  const [isShowChat, setIsShowChat] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const styles = {
    matchCardBottomNavbarParent: {
      display: "flex",
      backgroundColor: "#23202e",
      justifyContent: "space-around",
    },
    navbarButtonStyle: {
      padding: 0,
      background: "none",
      border: "none",
      "&:hover": { color: "red" },
    },
    navbarButtonsText: {
      color: "#FFFFFF",

      "&:hover": { color: "red" },
    },
    activenavbarButtonsText: {
      borderBottom: "solid 0.1em red",
      "&:hover": { color: "red" },
      color: "red",
    },
  };

  // useEffect(() => {
  //   console.log("Id: ", currentMatchId);
  //   let match = liveMatchDetails.find(
  //     (elem) => elem.id == currentMatchId
  //   );
  //   setMatchData(match);
  // }, [currentMatchId]);

  const cricketReducer = useSelector(
    (state) => state.cricketReducer?.currentMatchData
  );

  const [matchData, setMatchData] = useState(cricketReducer);

  React.useEffect(() => {
    setMatchData(cricketReducer);
  }, [cricketReducer]);

  React.useEffect(() => {
    console.log("triggered");
    socket.emit("live_match", `${currentMatchId}`);
    socket.on("live_match_data", (data) => {
      data = JSON.parse(data);
      dispatch(setCurrentMatchData(data));
    });
  }, [triggered]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeNavBarButton, setActiveNavbarButton] = useState(0);

  const handleChange = (e, index) => {
    setValue(index);
    setActiveNavbarButton(index);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
    setActiveNavbarButton(index);
  };
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <div className="banner-live-match">
      <MatchCardBanner matchData={matchData} />
      {/* <ScoreCard data={matchData} currentBowler={matchData?.currentBowler} currentBatsman={matchData?.currentBatsman} supportBatsman={matchData.supportBatsman} /> */}
      <Box style={{ backgroundColor: "#000", color: "#fff" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant={isBigScreen ? "fullWidth" :"scrollable"}
            
            
            aria-label="full width tabs example"
          >
            <Tab label="Info" {...a11yProps(0)} />
            <Tab label="Live" {...a11yProps(1)} />
            <Tab label="Score Board" {...a11yProps(2)} />
            <Tab label="Squad" {...a11yProps(3)} />
            <Tab label="chat" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}><Info /></TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}><Live /></TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}><ScoreBoard bandColor="#1F1C2A" /></TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}><Squad /></TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
          { window.location.href.includes("livematchpage") && (
          <div style={{ minHeight: "20em", padding: "2em" }}>
            <ChatWindow currentMatchId={currentMatchId} />
          </div>
        )}
          </TabPanel>
        </SwipeableViews>
      </Box>
    
      
    
    </div>
  );
};
