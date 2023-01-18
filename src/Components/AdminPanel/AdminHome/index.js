import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import { UpcomingMatchesList } from "./UpcomingMatchesList";
import { PlayersList } from "./PlayersList";
import { ImageEditOptions } from "./ImageEditOptions";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import AppSettingsAltTwoToneIcon from '@mui/icons-material/AppSettingsAltTwoTone';
import { useDispatch } from "react-redux";
import { setClearAdminMessage } from "../../../actions/adminAction";
import { BannerEditMobile } from "./BannerEditMobile";
import { BannerEditWeb } from "./BannerEditWeb";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminHome() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const IconsList = {
    "Manage Images": <AddPhotoAlternateIcon />,
    "Manage Players": <PlaylistAddCircleIcon />,
    "Upcoming Matches": <SportsCricketIcon />,
    "Logout": <LogoutRoundedIcon />,
    "Banner Edit Web":<ComputerTwoToneIcon/>,
    "Banner Edit Mobile":<AppSettingsAltTwoToneIcon/>
  };

  const [heading,setHeading]=React.useState("")
  const renderComponent = {
    "Manage Images": <ImageEditOptions />,
    "Manage Players": <PlayersList />,
    "Upcoming Matches": <UpcomingMatchesList />,
    "Banner Edit Mobile":<BannerEditMobile/>,
    "Banner Edit Web":<BannerEditWeb/>,
    "":<h1>Welcome to Admin Panel</h1>
  };
  const dispatch=useDispatch()
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Manage Images", "Manage Players", "Upcoming Matches","Banner Edit Web","Banner Edit Mobile","Logout"].map(
            (text) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={text==="Logout"?()=>dispatch(setClearAdminMessage("")):()=>setHeading(text)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {IconsList[text]}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box component="ma2" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* <div
          className="col-sm-12"
          style={{ display: "flex", justifyContent: "end", paddingTop: 0 }}
        >
          <Button
            variant="contained"
            component="label"
            endIcon={<PhotoCamera sx={{ height: "1.5vw", width: "1.5vw" }} />}
            sx={{
              backgroundColor: "#A62539",
              marginRight: "1vw",
              padding: "1vw",
              fontSize: "1vw",
              ":hover": { backgroundColor: "#402E51" },
            }}
          >
            Choose File
            <input
              style={{ display: "none", paddingRight: "1vw" }}
              accept="image/*"
              type="file"
              // onChange={handleChange}
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            //   onClick={() => {uploadFile(uploadedFile)}}
            sx={{
              backgroundColor: "#A62539",
              fontSize: "1vw",
              ":hover": { backgroundColor: "#402E51" },
            }}
          >
            Upload
          </Button>
        </div> */}
        {renderComponent[heading]}
      </Box>
    </Box>
  );
}
