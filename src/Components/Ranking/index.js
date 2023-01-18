import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Grid, Typography } from "@mui/material";
import { useState } from "react";

import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { getTeamRankingsUpdates } from "../../apiManager/services/cricketServices";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

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

function Ranking() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [category, setCategory] = React.useState(0);
  const indexs = [0, 1, 2];
  const TYPES = ["TEST", "ODI", "T20I"];
  const CATEGORIES = ["men", "women"];
  const { teamRankings } = useSelector((state) => state.cricketReducer);
  const [rankingType, setRankingType] = useState("TEST");
  const [genderType, setgenderType] = useState("men");

  useEffect(() => {
    dispatch(getTeamRankingsUpdates());
  }, []);

  const handleChangecategory = (event, newValue) => {
    setCategory(newValue);
    setgenderType(CATEGORIES[newValue]);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRankingType(TYPES[newValue]);

    if (TYPES[newValue] === TYPES[0] && category === 1) {
      setgenderType(CATEGORIES[0]);
      setCategory(0);
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);

    setRankingType(TYPES[index]);

    if (TYPES[index] === TYPES[0] && category === 1) {
      setgenderType(CATEGORIES[0]);
      setCategory(0);
    }
  };

  return (
    <Box style={{ backgroundColor: "#000", color: "#fff" }}>
      <AppBar position="static">
        <Grid container xs={12}>
          <Grid item xs={0.4}>
            <Link to="/">
              <button className="back-arrow">
                <ArrowBackRoundedIcon
                  sx={{
                    "&:hover": { color: "#402E51" },
                    position: "absolute",
                    marginTop: "-0.1em",
                  }}
                />
              </button>
            </Link>
          </Grid>
          <Grid item xs={11.6}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{ display: "inline" }}
            >
              <Tab
                label="Test ranking"
                {...a11yProps(0)}
                sx={{ width: "2%" }}
              />
              <Tab label="ODI ranking" {...a11yProps(1)} />
              <Tab label="T20 ranking" {...a11yProps(2)} />
            </Tabs>
          </Grid>
        </Grid>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {indexs.map((i) => {
          return (
            <TabPanel value={value} index={i} dir={theme.direction}>
              <Box sx={{ width: "100%" }}>
                <Box>
                  <Tabs
                    textColor="#ffff"
                    indicatorColor="secondary"
                    value={category}
                    onChange={handleChangecategory}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Men" {...a11yProps(0)} />
                    {value !== 0 && <Tab label="women" {...a11yProps(1)} />}
                  </Tabs>
                </Box>
                <TabPanel value={0} index={0}>
                  <div style={{ "overflow-x": "auto" }}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Rank</th>
                          <th scope="col">Team</th>
                          <th scope="col">Matches</th>
                          <th scope="col">Rating</th>
                          <th scope="col">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamRankings?.map((e) => {
                          return e.type === rankingType &&
                            e.gender === genderType
                            ? e.team?.map((evt, index) => {
                                return (
                                  <tr>
                                    <td>{evt.ranking?.position}</td>
                                    <td>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <Avatar src={evt.image_path} />
                                        <div
                                          style={{
                                            marginLeft: "10px",
                                            marginTop: "5px",
                                          }}
                                        >
                                          <span>{evt?.name}</span>{" "}
                                        </div>
                                      </div>
                                    </td>
                                    <td>{evt.ranking?.matches} matches</td>
                                    <td>{evt.ranking?.rating}</td>
                                    <td>{evt.ranking?.points}</td>
                                  </tr>
                                );
                              })
                            : null;
                        })}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>
              </Box>
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </Box>
  );
}

export default Ranking;
