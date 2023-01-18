import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { AvatarButton } from "./AvatarButton";

const Navbar = (props) => {
  const user = useSelector((state) => state.userReducer.user);
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    // setAnchorEl(null);
  }, []);

  const location = useLocation();
  React.useEffect(() => {
    switch (location.pathname) {
      case "/login":
        setTitle("Login");
        break;
      case "/signin-with-phonenumber":
        setTitle("OTP login");
        break;
      case "/signup":
        setTitle("SignUp");
        break;
      default:
        setTitle("");
        break;
    }
  }, [location, setTitle]);
  return (
    <>
      {window.location.pathname !== "/profile" && (
        <div class="header_bottom">
          <div class="container">
            <div class="header-bottom-top">
              <div class="logo" style={{ marginTop: 0 }}>
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    marginTop: 0,
                    padding:0
                  }}
                >
                  <a href="/" style={{ marginTop: 0 }}>
                    <img
                      src="images/final_logo_round.png"
                      style={{
                        height: "3.8em",
                        width: "auto",
                        marginBottom: "1.8em",
                      }}
                    />
                  </a>
                  <a href="/" style={{ marginTop: 0,textDecoration:"none" }}>
                   <h1>Scorenow</h1>
                  </a>
                </div>
              </div>

              <div class="top-nav">
                <span class="menu">
                  <img src="data:image/png;base64," alt="" />{" "}
                </span>
                <ul style={{ color: "#fffff" }}>
                  <Link to="/">
                    <li>
                      <a href="/" style={{ cursor: "pointer" }}>
                        Home
                      </a>
                    </li>
                  </Link>
                  <Link to="/about">
                    <li>
                      <a href="/about">About</a>
                    </li>
                  </Link>
                  <Link to="/favorites">
                    <li>
                      <a href="/favorites">Favorites</a>
                    </li>
                  </Link>
                  {!user.name ? (
                    <Link to="/login">
                      <li>
                        <a href="/login" style={{ cursor: "pointer" }}>
                          Login
                        </a>
                      </li>
                    </Link>
                  ) : (
                    <li>
                      <AvatarButton />
                    </li>
                  )}
                </ul>
              </div>
              <div class="clearfix"> </div>
            </div>
            <div class="top-nav">
              <button
                style={{ background: "none", border: "none", padding: 0 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span class="menu">
                  <img src="images/menu.png" alt="" />{" "}
                </span>
              </button>
              <ul
                style={{ color: "#fffff", display: isOpen ? "block" : "none" }}
              >
                <Link to="/">
                  <li>
                    <a href="/" style={{ cursor: "pointer" }}>
                      Home
                    </a>
                  </li>
                </Link>
                <Link to="/about">
                  <li>
                    <a href="/about">About</a>
                  </li>
                </Link>
                <Link to="/favorites">
                  <li>
                    <a href="/favorites">Favourites</a>
                  </li>
                </Link>
                {!user.name ? (
                  <Link to="/login">
                    <li>
                      <a href="/login" style={{ cursor: "pointer" }}>
                        Login
                      </a>
                    </li>
                  </Link>
                ) : (
                  <li>
                    <AvatarButton />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      {!user.name && (
        <div class="banner banner5">
          <h2>{title}</h2>
        </div>
      )}
    </>
  );
};
export default Navbar;
