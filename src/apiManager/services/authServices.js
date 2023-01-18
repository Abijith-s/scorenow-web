import { httpPOSTRequest } from "../httpRequestHandler";
import { API } from "../endPoints";
import { setPhoneNumberVerificationStatus, setSignupStatus, setUserDetails } from "../../actions/userAction";

export const userRegister = (data, ...rest) => {
    const done = rest.length ? rest[0] : () => { };
    const url = API.USER_REGISTER;

    return async (dispatch) => {
        try {
            let response = await httpPOSTRequest(url, data);
            dispatch(setSignupStatus(true));
            done(true);
        }
        catch (err) {
            done(false);
            dispatch(setSignupStatus(false));
        }
    }
};
export const userLogin = (data, done) => {
    // const done = rest.length ? rest[0] : () => {};
    const url = API.USER_LOGIN;
    return (dispatch) => {
        httpPOSTRequest(url, data).then((res) => {
            dispatch(setUserDetails(res.data));
            done();
        }).catch((err) => {
            done("Invalid User");
        })
    }
};

export const userLogout = (data,...rest) => {
    const url = API.USER_LOGOUT
    return (dispatch) => {
        httpPOSTRequest(url)
    }
};

export const verifyPhoneNumber = (data, ...rest) =>{
    const done = rest.length ? rest[0] : () => {};
    const url = API.VERIFY_PHONE_NUMBER;
    return async(dispatch) =>{
        try {
            let response = await httpPOSTRequest(url,data);
         if(response){
            dispatch(setPhoneNumberVerificationStatus(true));
            done(true);
         }
        } catch (err) {
            dispatch(setPhoneNumberVerificationStatus(false));
            done(false);
        }
        
    }
};

export const otpLogin = (data, ...rest) =>{
    const done = rest.length ? rest[0] : () => {};
    const url = API.OTP_LOGIN;
    return (dispatch) =>{
       httpPOSTRequest(url,data).then((res)=>{
        dispatch(setUserDetails(res.data));
        done(true);
       });
        
    }
};
