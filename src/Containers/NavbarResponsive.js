import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { AvatarButton } from "./AvatarButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const pages = ["Home", "About"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const user = useSelector((state) => state.userReducer.user);

  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page && typeof(page)==="string") {
      navigate(`/${page === "Home" ? "" : page}`);
    }
  };

  //   const handleCloseUserMenu = () => {
  //     setAnchorElUser(null);
  //   };

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl" fullWidth>
        <Toolbar disableGutters>
        <Avatar  src="/images/final_logo_round.png" style={{marginRight:"5px",height:"60px",width:"60px"}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ffff",
              textDecoration: "none",
            }}
          >
            SCORENOW
          </Typography>
          {/* mobile view start */}
         
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            SCORENOW
          </Typography>
          {/* mobile view end */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={() => {
                  handleCloseNavMenu(page);
                }}
              >
                <Typography color={"#ffff"} align="right" textAlign="right">
                  {page}
                </Typography>
              </MenuItem>
            ))}
            {
              user?.name && <MenuItem
              onClick={() => {
                handleCloseNavMenu("Favourites");
              }}
              >
              <Typography color={"#ffff"} align="right" textAlign="right">
              Favourites
                </Typography>
              </MenuItem>
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user?.name ? (
              <AvatarButton />
            ) : (
              <Button
                key={"login"}
                onClick={() => {
                  handleCloseNavMenu("login");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} style={{justifyContent:"flex-end"}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              style={{color:"#fff"}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu(page);
                  }}
                >
                  <Typography textAlign="right">{page}</Typography>
                </MenuItem>
              ))}
              {
              user?.name && <MenuItem
              onClick={() => {
                handleCloseNavMenu("Favourites");
              }}
              >
              <Typography  align="right" textAlign="right">
              Favourites
                </Typography>
              </MenuItem>
            }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
