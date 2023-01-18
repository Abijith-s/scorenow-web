import { Box } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsersPhoneNumber } from "../actions/userAction";
import {
  otpLogin,
  verifyPhoneNumber,
} from "../apiManager/services/authServices";
import firebase, { auth } from "../utils/firebase";
import { setUpRecaptha } from "../utils/firebase/phone-otp";
//const auth = getAuth(firebase);

export function SignInWithLogin(props) {
  const [result, setResult] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSented, setOtpSented] = useState(false);
  const dispatch = useDispatch();
  const phoneNumberVerificationStatus = useSelector(
    (state) => state.userReducer.phoneNumberVerfyStatus
  );

  const onSignInSubmit = async () => {
    if (!otpSented) {
      dispatch(
        verifyPhoneNumber({ phoneNumber: phoneNumber }, async (data) => {
          if (data) {
            try {
              dispatch(setUsersPhoneNumber(phoneNumber));
              const response = await setUpRecaptha("+91" + phoneNumber);
              setResult(response);
              setOtpSented(true);
            } catch (error) {
              console.log(error);
              console.log(error.message);
            }
          }
        })
      );
    } else {
      try {
        await result.confirm(otp);
        dispatch(otpLogin({ phoneNumber: phoneNumber }));
      } catch (error) {
        alert("Otp is incorrect");
        console.log("error");
        console.log(error);
      }
    }
  };

  return (
    <>
     <Box sx={{ flexGrow: 1 }}  className="login-page"> 
         <div className="container login-wrapper">
          <div className="form-wrapper">
          {!otpSented ? (
            <input
              placeholder="Enter your number here"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <input
              placeholder="Enter your otp here"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}
            <button
            className="submit-button"
            onClick={onSignInSubmit}
          >
            {otpSented ? "Submit OTP" : "Send OTP"}
          </button>
          </div>
          <div id="recaptcha-container" className="col-sm-12" style={{display:"flex",justifyContent:"center"}}></div>
          </div>
      </Box>
        
      
    </>
  );
}
