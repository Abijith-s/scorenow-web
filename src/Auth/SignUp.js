import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userRegister } from "../apiManager/services/authServices";
import { useSnackbar } from "notistack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, IconButton } from "@mui/material";

export const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCofirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [isShowError, setIsShowError] = useState(false);
  const [showPassword, setShowPassword] = useState({
    passwordshow: false,
    confirmPasswordshow: false,
  });

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    phoneNumberError: "",
  });
  const emailRegex = /^\w+([.]?\w+)*@\w+([.]?\w+)*(\.\w{2,3})+$/;
  // const nameRegex =/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/
  // const phoneNumberRegex =/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

  const signUpValidation = (e) => {
    if (e.target.name === "fullName") {
      setName(e.target.value);
      if (name.length < 4) {
        setErrors({ ...errors, nameError: "Invalid name!" });
      } else {
        setErrors({ ...errors, nameError: "" });
      }
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
      if (email.length > 0) {
        if (!email.match(emailRegex)) {
          setErrors({ ...errors, emailError: "Invalid Email!" });
        } else {
          setErrors({ ...errors, emailError: "" });
        }
      }
    } else if (e.target.name === "phonenumber") {
      setPhoneNumber(e.target.value);
      if (phoneNumber.length > 0) {
        if (document.getElementsByName("phonenumber")[0].value.length !== 10) {
          setErrors({ ...errors, phoneNumberError: "Invalid Phone Number!" });
        } else {
          setErrors({ ...errors, phoneNumberError: "" });
        }
      }
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      if (password.length > 0) {
        if (password.length < 5) {
          setErrors({
            ...errors,
            passwordError: "Invalid Password! (minimum length 6)",
          });
        } else {
          setErrors({ ...errors, passwordError: "" });
        }
      }
    }
  };

  const passwordMatchCheck = () => {
    if (
      document.getElementsByName("confirmPassword")[0].value !==
      document.getElementsByName("password")[0].value
    ) {
      setErrors({
        ...errors,
        confirmPasswordError: "Passwords dont't match",
      });
    } else {
      setErrors({ ...errors, confirmPasswordError: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsShowError(true);
    if (
      errors.emailError === "" &&
      errors.passwordError === "" &&
      errors.nameError === "" &&
      errors.phoneNumberError === "" &&
      email !== "" &&
      password !== "" &&
      name !== "" &&
      phoneNumber !== ""
    ) {
      const signInData = {
        name,
        email,
        password,
        phoneNumber,
      };
      dispatch(
        userRegister(signInData, (data) => {
          if (data) {
            navigate("/login");
          } else {
            const alreadyExistError = (
              <p style={{ fontSize: "2em", display: "inline" }}>
                Email or phone number already exist
              </p>
            );
            enqueueSnackbar(alreadyExistError, {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
          }
        })
      );
    } else if (
      email === "" ||
      password === "" ||
      name === "" ||
      phoneNumber === ""
    ) {
      const Message = (
        <p style={{ fontSize: "2em", display: "inline" }}>
          Enter the details correctly
        </p>
      );
      enqueueSnackbar(Message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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
        setErrors({ ...errors, emailError: "" });
      }
    }
  }, [email]);

  useEffect(() => {
    if (name.length > 0) {
      if (name.length < 4) {
        setErrors({ ...errors, nameError: "Invalid name!" });
      } else {
        setErrors({ ...errors, nameError: "" });
      }
    }
  }, [name]);
 const styles={margin:".5rem"}
  return (
    <Box sx={{ flexGrow: 1 }}  className="login-page">
      <div className="container login-wrapper">
      <form onSubmit={handleSubmit} className="form-wrapper">
          <input
            value={name}
            onChange={(e) => {
              signUpValidation(e);
              setIsShowError(false);
            }}
            style={styles}
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
          />
          {errors.nameError && isShowError && (
            <span className='error-text' >{errors.nameError}</span>
          )}

          <input
            onChange={(e) => {
              signUpValidation(e);
              setIsShowError(false);
            }}
            type="text"
            name="email"
            placeholder="Email"
            style={styles}

          />
          {errors.emailError && isShowError && (
            <span className="error-text" >{errors.emailError}</span>
          )}

          <input
          style={styles}
            onChange={(e) => {
              signUpValidation(e);
              setIsShowError(false);
            }}
            type="tel"
            name="phonenumber"
            placeholder="Enter your Phone number"
            maxlength="10"
            pattern="[0-9]+"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
      
          />
          {errors.phoneNumberError && isShowError && (
            <span className="error-text">{errors.phoneNumberError}</span>
          )}

          <div
           className="password-wrapper"
           style={styles}
          >
            <input
             
              onChange={(e) => {
                signUpValidation(e);
                setIsShowError(false);
              }}
              value={password}
              type={showPassword.passwordshow ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            {!showPassword.passwordshow ? (
              <IconButton
                onClick={() =>
                  setShowPassword({ ...showPassword, passwordshow: true })
                }
              >
                <VisibilityOffIcon
                  sx={{
                    color: "#FFFFFF",
                    
                    "&:hover": { color: "red" },
                  }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() =>
                  setShowPassword({ ...showPassword, passwordshow: false })
                }
              >
                <VisibilityIcon
                  sx={{
                    color: "#FFFFFF",
                    
                    "&:hover": { color: "red" },
                  }}
                />
              </IconButton>
            )}
          </div>
          {errors.passwordError && isShowError && (
            <span className="error-text">{errors.passwordError}</span>
          )}

          <div
            className="password-wrapper"
            style={styles}
          >
            <input
             
              type={showPassword.confirmPasswordshow ? "text" : "password"}
              name="confirmPassword"
             
              onChange={(e) => {
                setCofirmPassword(e.target.value);
                passwordMatchCheck();
                setIsShowError(false);
              }}
              placeholder="Confirm Password"
            />
            {!showPassword.confirmPasswordshow ? (
              <IconButton
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmPasswordshow: true,
                  })
                }
              >
                <VisibilityOffIcon
                  sx={{
                    color: "#FFFFFF",
                  
                    "&:hover": { color: "red" },
                  }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmPasswordshow: false,
                  })
                }
              >
                <VisibilityIcon
                  sx={{
                    color: "#FFFFFF",
                   
                    "&:hover": { color: "red" },
                  }}
                />
              </IconButton>
            )}
          </div>
          {errors.confirmPasswordError && (
            <span className="error-text">{errors.confirmPasswordError}</span>
          )}
          {!errors.confirmPasswordError && confirmPassword.length > 1 && (
            <span style={{ color: "green" }}>Passwords match</span>
          )}
          <input type="submit" value="SignUp" />
        </form>
      </div>
    </Box>
   
  );
};
