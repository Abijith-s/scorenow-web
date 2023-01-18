import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../apiManager/services/authServices";
import { useSnackbar } from "notistack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Grid, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Carousal from "../Containers/Carousal";

export const Login = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const handleSubmit = (e) => {
    setIsShowError(true);
    e.preventDefault();
    if (email === "" || password === "") {
      let error = { ...errors };
      if (email.length === 0) {
        error = { ...error, emailError: "Enter Email Id" };
        const snackbarmessage = (
          <span style={{ fontSize: "1em", display: "inline" }}>
            Enter Email Id
          </span>
        );
        enqueueSnackbar(snackbarmessage, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      if (password.length === 0) {
        error = { ...error, passwordError: "Enter the password" };
        const snackbarmessage = (
          <span style={{ fontSize: "1em", display: "inline" }}>
            Enter the password
          </span>
        );
        enqueueSnackbar(snackbarmessage, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      setErrors({ ...error });

      return;
    }
    if (errors.emailError === "" && errors.passwordError === "") {
      const signInData = {
        email,
        password,
      };
      dispatch(userLogin(signInData, (err)=> {
       if(err){
        enqueueSnackbar(err, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
       }else{
        enqueueSnackbar("Login successfull", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
       }
      }));

      
    }
  };

  const LoginValidation = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (password.length > 0) {
      if (password.length < 5) {
        setErrors({ ...errors, passwordError: "Invalid Password!" });
      } else {
        setErrors({ ...errors, passwordError: "" });
      }
    }
  }, [password]);

  useEffect(() => {
    if (email.length > 0) {
      if (!email.match(emailRegex)) {
        setErrors({ ...errors, emailError: "Invalid Email!" });
      } else {
        console.log("error cleared");
        setErrors({ ...errors, emailError: "" });
      }
    }
  }, [email]);

  const styles = {
    passwordDivStyle: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#402E51",
      borderRadius: "2em",
      marginTop: "0.5em",
    },
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="login-page">
        <div className="container login-wrapper">
          <form onSubmit={handleSubmit} className="form-wrapper">
            <input
              onChange={(e) => {
                LoginValidation(e);
                setIsShowError(false);
              }}
              type="text"
              name="email"
              placeholder="Email"
            />
            {errors.emailError && isShowError && (
              <span className="error-text">{errors.emailError}</span>
            )}
            <div className="password-wrapper">
              <input
                className="input-password"
                onChange={(e) => {
                  LoginValidation(e);
                  setIsShowError(false);
                }}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />

              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <VisibilityOffIcon
                    sx={{
                      color: "#FFFFFF",
                      "&:hover": { color: "red" },
                    }}
                  />
                ) : (
                  <VisibilityIcon
                    sx={{
                      color: "#FFFFFF",

                      "&:hover": { color: "red" },
                    }}
                  />
                )}
              </IconButton>
            </div>
            {errors.passwordError && isShowError && (
              <span className="error-text">{errors.passwordError}</span>
            )}
            <input type="submit" value="LOGIN" style={{ marginTop: "0.5em" }} />
          </form>
          <div className="form-wrapper otp-wrapper">
            <Link to="/signin-with-phonenumber">
              <button className="otpLogin">Login using phone number</button>
            </Link>
            <br />
            <strong style={{ color: "#A62539" }}>New here?</strong>
            <Link to="/signup">
              <a href="/signup" style={{ cursor: "pointer", color: "#A62539" }}>
                SignUp
              </a>
            </Link>
          </div>
        </div>
      </Box>
    </>
  );
};
