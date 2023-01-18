import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPassword } from "../../apiManager/services/userProfileServices";
import { ToastContainer, toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";

export const EditPasswordForm = () => {
  const styles = {
    extraInputStyle: {
      height: "3em",

      marginBottom: "0.2em",
    },
    inputDivStyle: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#402E51",
      borderRadius: "3em",
      marginTop: "0.5em",
    },
  };
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState({
    oldPasswordshow: false,
    newPasswordshow: false,
    confirmPasswordshow: false,
  });

  const passwordMatch = () => {
    if (
      document.getElementsByName("confirmPassword")[0].value !==
      document.getElementsByName("newPassword")[0].value
    ) {
      setErrorMessage("Passwords don't match!");
    } else {
      setErrorMessage("Passwords match!");
    }
  };
  const validation = () => {
    if (newPassword.length < 6) {
      setPasswordError("Password length less than 6!");
      toast.error("Password length less than 6!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setPasswordError("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validation();
    const newData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    if (errorMessage === "Passwords match!" && newPassword.length >= 6) {
      dispatch(
        editPassword(newData, (data) => {
          if (data) {
            toast.success("Successfully Changed Password", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error("Invalid old password!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
      );
    } else if (newPassword.length < 6) {
      toast.error("enter a valid password (length greater than or equal to 6)!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      oldPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      toast.error("Enter the passwords correctly!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Passwords Don't Match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div class="col-sm-6 contact-content">
      <p style={{ color: "#FFFFFF", fontSize: "1.5rem", textAlign: "center" }}>
        Edit Password
      </p>
      <form onSubmit={handleSubmit} className="form-wrapper profile">
        <div className="password-wrapper">
          <input
            type={showPassword.oldPasswordshow ? "text" : "password"}
            name="oldPassword"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            placeholder="Old Password"
          />
          {!showPassword.oldPasswordshow ? (
            <IconButton
              onClick={() =>
                setShowPassword({ ...showPassword, oldPasswordshow: true })
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
                setShowPassword({ ...showPassword, oldPasswordshow: false })
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
        <div className="password-wrapper">
          <input
            type={showPassword.newPasswordshow ? "text" : "password"}
            name="newPassword"
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrorMessage("");
            }}
            placeholder="New Password"
          />
          {!showPassword.newPasswordshow ? (
            <IconButton
              onClick={() =>
                setShowPassword({ ...showPassword, newPasswordshow: true })
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
                setShowPassword({ ...showPassword, newPasswordshow: false })
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
        {passwordError !== "" && (
          <p style={{ color: "red", fontSize: "1.5vw", marginLeft: "0.5em" }}>
            {passwordError}
          </p>
        )}

        <div className="password-wrapper">
          <input
            type={showPassword.confirmPasswordshow ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              passwordMatch();
            }}
          />
          {!showPassword.confirmPasswordshow ? (
            <IconButton
              onClick={() =>
                setShowPassword({ ...showPassword, confirmPasswordshow: true })
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
                setShowPassword({ ...showPassword, confirmPasswordshow: false })
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
        <p
          style={
            errorMessage === "Passwords don't match!"
              ? { color: "red", fontSize: "1vw", marginLeft: "0.5em" }
              : { color: "green", fontSize: "1vw", marginLeft: "0.5em" }
          }
        >
          {errorMessage}
        </p>
        <input
          type="submit"
          value="Edit Password"
          style={styles.extraInputStyle}
        />
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
