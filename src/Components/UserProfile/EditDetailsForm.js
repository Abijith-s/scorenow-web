import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../../apiManager/services/userProfileServices";
import UploadImage from "./UploadImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

export const EditDetailsForm = (props) => {
  const styles = {
    extraInputStyle: {
      height: "3em",
      fontSize: "1.3vw",
      marginBottom: "0.2em",
    },
  };
  const showSuccessMessage = () => {
    toast.success("Successfully Edited the details", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorMessage = () => {
    toast.error("None of the details were changed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showEmailError = () => {
    toast.error("Enter proper email ID!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const [newName, setNewName] = useState(userProfile.name);
  const [newEmail, setNewEmail] = useState(userProfile.email);
  const [newPhoneNumber, setNewPhoneNumber] = useState(userProfile.phoneNumber);
  const [isChanged, setIsChanged] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^\w+([.]?\w+)*@\w+([.]?\w+)*(\.\w{2,3})+$/;

    if (!newEmail.match(emailRegex)) {
      showEmailError();
    } else {
      const profileData = {
        newName: newName,
        newEmail: newEmail,
        newPhoneNumber: newPhoneNumber,
      };

      dispatch(editUserProfile(profileData));
      if (isChanged) {
        showSuccessMessage();
      } else {
        showErrorMessage();
      }
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container columns={{ xs: 12, sm: 12, md: 12 }}>
        <Grid item xs={12} sm={12} md={6} style={{ marginBottom: "2rem" }}>
          <p style={{ color: "#fff", textAlign: "center", fontSize: "1.5rem" }}>
            Edit User Details
          </p>

          <form onSubmit={handleSubmit} className="form-wrapper profile">
            <input
              type="text"
              style={{ marginBottom: "1rem" }}
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                setIsChanged(true);
              }}
              name="fullName"
              placeholder="Enter Full Name"
            />
            <input
              type="text"
              style={{ marginBottom: "1rem" }}
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
                setIsChanged(true);
              }}
              name="email"
              placeholder="Email"
            />
            <input
              style={{ marginBottom: "1rem" }}
              value={newPhoneNumber}
              onChange={(e) => {
                setNewPhoneNumber(e.target.value);
                setIsChanged(true);
              }}
              type="tel"
              name="phonenumber"
              maxlength="10"
              pattern="[0-9]+"
              placeholder="Enter your Phone number"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />

            <input type="submit" value="Edit details" />
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
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <p style={{ color: "#fff", textAlign: "center", fontSize: "1.5rem" }}>
            Edit User Details
          </p>
          <div className="form-wrapper profile">
            <UploadImage />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
