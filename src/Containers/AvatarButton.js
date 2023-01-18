import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { fetchUserDetails } from "../apiManager/services/userProfileServices";
import { API } from "../apiManager/endPoints";
import { setUserLogout } from "../actions/userAction";
import { userLogout } from "../apiManager/services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const AvatarButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [anchorEl, setAnchorEl] = React.useState(false);
  let open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    dispatch(fetchUserDetails({ email: user.email }));
    setAnchorEl(null);
  };
  const Logout = () => {
    dispatch(setUserLogout());
    dispatch(userLogout());
  };
  return (
    <>
      <IconButton
        style={{ padding: 0 }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => handleClick(event)}
      >
        <Avatar  src={API.GET_USER_PROFILE_PICTURE} style={{border:"2px solid white"}} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ width: "19em" }}
      >
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <MenuItem
            onClick={handleClose}
            style={{
              fontSize: "1.2em",
              textDecoration: "none",
            }}
          >
            Profile
          </MenuItem>
        </Link>
        <Link to="" onClick={() => Logout()} style={{ textDecoration: "none" }}>
          <MenuItem
            style={{
              fontSize: "1.2em",
              textDecoration: "none",
            }}
          >
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
