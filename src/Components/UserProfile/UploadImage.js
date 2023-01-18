import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch } from "react-redux";
import { uploadProfilePicture } from "../../apiManager/services/userProfileServices";
import { API } from "../../apiManager/endPoints";
import { ToastContainer, toast } from "react-toastify";


const UploadImage = () => {
  const dispatch = useDispatch();
  const profilePicture = API.GET_USER_PROFILE_PICTURE;
  const [file, setFile] = useState(
    profilePicture !== "undefined"
      ? profilePicture
      : "../images/avatarProfile.png"
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  const showSuccessMessage = () => {
    toast.success("Profile picture added successfully!", {
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
    toast.error("Please upload a picture", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setUploadedFile(e.target.files[0]);
  };
  const uploadFile = (file) => {
    if (uploadedFile){
      getBase64(file).then((result) => {
        dispatch(uploadProfilePicture({ profilePicture: result }));
      });
      showSuccessMessage()
    }else{
      showErrorMessage()
    }
  };
  
  return (
    <div>
      <img
            src={file}
            style={{ maxHeight: "13em", maxWidth: "13em", borderRadius: "50%" }}
            alt="avatar"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
            }}
          />
      <div
       
        style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
      >
        <Button
          variant="contained"
          component="label"
          endIcon={<PhotoCamera sx={{height:"1.5vw",width:"1.5vw"}} />}
          sx={{
            backgroundColor: "#A62539",
      
            ":hover": { backgroundColor: "#402E51" },
          }}
        >
          Choose File
          <input
            style={{ display: "none" ,paddingRight:"1vw"}}
            accept="image/*"
            type="file"
            onChange={handleChange}
          />
        </Button>
        <Button
        className="mx-2"
          variant="contained"
          component="label"
          onClick={() => {uploadFile(uploadedFile)}}
          sx={{
            backgroundColor: "#A62539",
          
            ":hover": { backgroundColor: "#402E51" },
          }}
        >
          Upload
        </Button>
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
    </div>
  );
};
export default UploadImage;
