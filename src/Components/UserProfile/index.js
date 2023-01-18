import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Avatar } from "@mui/material";
import { EditDetailsForm } from "./EditDetailsForm";
import { EditPasswordForm } from "./EditPasswordForm";
import { Link } from "react-router-dom";
import { API } from "../../apiManager/endPoints";

export const UserProfile = (props) => {
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const drawerWidth = 240;
  const [menu, setMenu] = useState("");
  const profilePicture=API.GET_USER_PROFILE_PICTURE
  const menuForms = {
    "Edit Details": <EditDetailsForm drawerWidth={drawerWidth} />,
    "Edit Password": <EditPasswordForm />,
    "": <h1 style={{ color: "#FFFFFF" }}>Welcome,{userProfile.name}!</h1>,
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ backgroundColor: "#402E51" }}>
      <Toolbar />
      <Divider />
      <List>
        {["Edit Details", "Edit Password"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              fontSize: "2em",
              "&:active": { backgroundColor: "red" },
              "&:hover": {
                backgroundColor: "#A62539",
              },
            }}
          >
            <ListItemButton onClick={(e) => {setMenu(text); handleDrawerToggle()}}>
              <ListItemIcon sx={{ color: "#FFFFFF" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <h6 style={{ color: "#FFFFFF" }}>{text}</h6>
            </ListItemButton>
          </ListItem>
        ))}
        <Link to="/" style={{textDecoration:"none"}}>
        <ListItem
            disablePadding
            sx={{
              fontSize: "2em",
              "&$selected": { backgroundColor: "red" },
              "&:hover": {
                backgroundColor: "#A62539",
              },
            }}
          >
            <ListItemButton onClick={(e) => setMenu("Home")}>
              <ListItemIcon sx={{ color: "#FFFFFF" }}>
               <InboxIcon />
              </ListItemIcon>
              <h6 style={{ color: "#FFFFFF" }}>Home</h6>
            </ListItemButton>
          </ListItem>
          </Link>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex", backgroundColor: "#402E51", flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#A62539",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar  src={profilePicture!=="undefined"?profilePicture:"../images/avatarProfile.png"} />
          <h3 style={{ marginLeft: "0.5em" }}>{userProfile.name}</h3>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          backgroundColor: "#402E51",
          maxHeight: "100vh",
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            backgroundColor: "#402E51",
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#402E51",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          backgroundColor: "#1e1e1e",
        }}
      >
        <Toolbar />
        {menuForms[menu]}
      </Box>
    </Box>
  );
};
