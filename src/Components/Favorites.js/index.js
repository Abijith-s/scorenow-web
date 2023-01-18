import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavourites } from "../../apiManager/services/favouriteServices";
import { FavoriteLeagues } from "./FavoriteLeagues";
import { Header } from "./Header";
import { Players } from "./Players";
import { Teams } from "./Teams";


import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
 

export const Favorites = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavourites());
  }, []);
  
 
  
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeButton, setActiveButton] = useState("Players");
  const options = ["Players","Teams","Leagues"]
  const boxTabs = [
      <Players isAdd={isAdd} isEdit={isEdit} />,
      <Teams isAdd={isAdd} isEdit={isEdit} />,
      <FavoriteLeagues isEdit={isEdit} isAdd={isAdd} />,
  ];

 

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setActiveButton(options[newValue])
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    setActiveButton(options[index])

  };

  return (
    <>
      <Header
        isAdd={isAdd}
        setIsAdd={setIsAdd}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
        <Box  style={{backgroundColor:"#000",minHeight:"100vh"}}  fullwidth>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Players" {...a11yProps(0)} />
          <Tab label="Teams" {...a11yProps(1)} />
          <Tab label="Leagues" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {options.map((e,i)=>{
          return <TabPanel value={value} index={i} dir={theme.direction} >
                  {boxTabs[i]}
                 </TabPanel>
        })}
         
      </SwipeableViews>
    </Box>

    </>
  );
};
