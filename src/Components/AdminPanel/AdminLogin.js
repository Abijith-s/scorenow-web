import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { adminLogin } from "../../apiManager/services/adminServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setAdminMessage } from "../../actions/adminAction";

export const AdminLogin = (props) => {
  const navigate=useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    usernameError: "",
    passwordError: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowError, setIsShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message,setMessage]=useState("")
  const handleSubmit = (e) => {
    setIsShowError(true);
    setShowPassword(false)
    e.preventDefault();
    if (username === "" || password === "") {
      let error = { ...errors };
      if (username.length === 0) {
        error = { ...error, usernameError: "Enter username" };
        const snackbarmessage = (
          <p style={{ fontSize: "2em", display: "inline" }}>Enter username</p>
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
          <p style={{ fontSize: "2em", display: "inline" }}>
            Enter the password
          </p>
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
    if (errors.usernameError === "" && errors.passwordError === "") {
      const loginData = {
        adminUserName:username,
        adminPassword:password,
      };
      dispatch(adminLogin(loginData, setMessage));
      if(message==="admin login successfull"){
       window.location="/admin/home"
       dispatch(setAdminMessage(message))
      // navigate("/admin/home")
      }else if (message === "admin login failed") {
        const snackbarmessage = (
          <p style={{ fontSize: "2em", display: "inline" }}>
            Invalid credentials!
          </p>
        );
        enqueueSnackbar(snackbarmessage, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } else {
      setErrorMessage("Invalid User");
      const snackbarmessage = (
        <p style={{ fontSize: "2em", display: "inline" }}>
          Invalid credentials !
        </p>
      );
      enqueueSnackbar(snackbarmessage, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const LoginValidation = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
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
    if (username.length > 0) {
      if (username.length<4) {
        setErrors({ ...errors, usernameError: "Invalid user name!" });
      } else {
        console.log("error cleared");
        setErrors({ ...errors, usernameError: "" });
      }
    }
  }, [username]);

  const styles={
    passwordDivStyle:{
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#402E51",
      borderRadius: "2em",
      marginTop: "0.5em",
    }
   }
  return (
    <>
 
    <div className="container login-wrapper">
    <div style={{display:"flex",justifyContent:"center",marginTop:"10%",padding:"2%"}}>
      <h1>ADMIN</h1>
    </div>
         <form onSubmit={handleSubmit}   className="form-wrapper">
            <input
               onChange={(e) => {
                LoginValidation(e);
                setIsShowError(false);
              }}
              type="text"
              name="username"
              placeholder="Enter user name"
            />
             
             {errors.usernameError && isShowError && (
              <span className="error-text">{errors.usernameError}</span>
            )}
           <div className="password-wrapper" >
           <input
             onChange={(e) => {
              LoginValidation(e);
              setIsShowError(false);
            }}
            name="password"
            type={showPassword? "text" : "password"}
            placeholder="Password"
            />

              <IconButton
                
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <VisibilityOffIcon
                  
                  sx={{
                    color: "#FFFFFF",
                    
                   
                    "&:hover": { color: "red" },
                  }}
                />
                ):(
                  
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
            <input type="submit" value="LOGIN" style={{marginTop:"0.5em"}}/>
          </form> 
           
      </div>
    </>
  );
};
