import { httpPOSTRequest } from "../httpRequestHandler";
import { API } from "../endPoints";
import { setProfile, setUserDetails } from "../../actions/userAction";



export const fetchUserDetails = (data,...rest)=>{
    const done = rest.length ? rest[0] : () => { };
    const url = API.GET_USER_DETAILS
    return async (dispatch) => {
        try {
            let response = await httpPOSTRequest(url, data);
            dispatch(setProfile(response.data.data))
            done(true);
        }
        catch (err) {
            console.log("error",err);
            done(false);
        }
    }
}

export const editUserProfile = (data,...rest)=>{
    const done = rest.length ? rest[0] : () => { };
    const url = API.EDIT_USER_PROFILE
    return async (dispatch) => {
        try {
            let response = await httpPOSTRequest(url, data);
            dispatch(setProfile(response.data.data));
            dispatch(setUserDetails(response.data.data));
            done(true);
        }
        catch (err) {
            console.log("error",err);
            done(false);
        }
    }
}

export const editPassword = (data,...rest)=>{
    console.log("ivde")
    const done = rest.length ? rest[0] : () => { };
    const url = API.EDIT_USER_PASSWORD
    return async (dispatch) => {
    console.log("ivde2")

             await httpPOSTRequest(url, data).then((response)=>{
                console.log("success",response)
                done(response);
             }).
        catch ((err)=> {
            console.log("error",err.response.data.errors[0].message);
            done(false);
        })
    }
}

export const uploadProfilePicture = (data,...rest)=>{
    const done = rest.length ? rest[0] : () => { };
    const url = API.UPLOAD_USER_PROFILE_PICTURE
    return async (dispatch) => {
        try {
            let response = await httpPOSTRequest(url, data);
            done(true);
        }
        catch (err) {
            console.log("error",err);
            done(false);
        }
    }
}

export const submitContactForm = ()=>{
    
}

