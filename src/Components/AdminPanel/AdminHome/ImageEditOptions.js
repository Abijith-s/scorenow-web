import React, { useState } from "react";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch } from "react-redux";
import { playerImageUpload } from "../../../apiManager/services/adminServices";
import { useSnackbar } from "notistack";

export const ImageEditOptions = () => {
  const styles = {
    inputStyles: {
      width: "100%",
      backgroundColor: " #FFFFFF",
      fontSize: "2vw",
      height: "3vw",
      borderRadius: "2em",
      padding: "2%",
    },
    submitBtnStyle: {
      width: "100%",
      backgroundColor: " black",
      color: "white",
      fontSize: "2vw",
      border: "none",
      height: "3vw",
      borderRadius: "2em",
      textAlign: "center",
    },
  };
  const dispatch = useDispatch()
  const [file, setFile] = useState("../images/avatarProfile.png");
  const [uploadFile,setUploadFile] = useState(null);
  const [playerId,setPlayerId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

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
    setUploadFile(e.target.files[0]);
  };

  const handleSubmit = (e)=>{
    getBase64(uploadFile)
    .then((result)=>{
      enqueueSnackbar("Image uploaded successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      dispatch(playerImageUpload({playerImage:result,playerId:playerId}));
    }).catch((err)=>enqueueSnackbar("Image upload failed", {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    }))
  };

  return (
    <div>
      <div
        class="container contact col-sm-12"
        style={{ display: "flex", justifyContent: "center",marginTop:"2%" }}
      >
        <div class="col-sm-6 contact-content" style={{ width: "50vw" }}>
          
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              style={styles.inputStyles}
              onSubmit={(e)=> handleSubmit(e)}
            />

            <input
              type="text"
              name="id"
              placeholder="player id"
              style={styles.inputStyles}
              onChange={(e)=> setPlayerId(e.target.value)}
            />
            <div className="col-sm-12" style={{ padding: 0 }}>
              <div
                style={{
                //   paddingBottom: "8vw",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <img
                  src={file}
                  style={{
                    maxHeight: "8em",
                    maxWidth: "8em",
                    borderRadius: "50%",
                  }}
                  alt="avatar"
                />
              </div>
            </div>
            <div
              className="col-sm-12"
              style={{ display: "flex", justifyContent: "end", paddingTop: 0 }}
            >
              <Button
                variant="contained"
                component="label"
                endIcon={
                  <PhotoCamera sx={{ height: "1.5vw", width: "1.5vw" }} />
                }
                sx={{
                  backgroundColor: "primary",
                  marginRight: "1vw",
                  padding: "0.5vw",
                //   fontSize: "0.5vw",
                  ":hover": { backgroundColor: "#402E51" },
                }}
              >
                Choose File
                <input
                  style={{ display: "none", paddingRight: "1vw" }}
                  accept="image/*"
                  type="file"
                  onChange={handleChange}
                />
              </Button>
            </div>
            <button type="submit" value="SUBMIT" style={styles.submitBtnStyle} onClick={()=>handleSubmit()}>Submit</button>
          
        </div>
      </div>
    </div>
  );
};
