import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch } from "react-redux";
import {
  getFavourites,
  getLeagues,
  getTeams,
} from "../../apiManager/services/favouriteServices";

export const Header = (props) => {
  const dispatch = useDispatch();
  // const getAllTeams = ()=>{
  //   dispatch(getTeams())
  // }
  // const getAllLeagues = ()=>{
  //   dispatch(getLeagues())
  // }
  useEffect(() => {
    dispatch(getTeams());
    dispatch(getLeagues());
  }, [dispatch]);
  const styles = {
    cardHeaderDiv: {
      backgroundColor: "#A62539",
      display: "flex",
      justifyContent: "space-between",
    },
  };
  return (
    <div style={styles.cardHeaderDiv} className="col-sm-12">
      <div
        
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems:"center",
          flexDirection: "row",
          wordSpacing:"0.5vw"
        }}
      >
        <Link to="/">
          <button
            style={{ color: "#FFFFFF", background: "none", border: "none", cursor:"pointer"}}
          >
            <ArrowBackRoundedIcon
              sx={{
               
                
                fontWeight: 800,
                "&:hover": { color: "#402E51" },
              }}
              
            />
          </button>
        </Link>
        <h3
          style={{
            color: "white",
            textDecoration: "",
          }}
        >
          Favorites
        </h3>
      </div>
      <div
        
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        {!props.isEdit && (
          <div style={{ padding: 0 }}>
            {!props.isAdd ? (
              <button
                style={{ color: "#FFFFFF", background: "none", border: "none" }}
                onClick={() => {
                  props.setIsAdd(true);
                }}
              >
                <AddIcon
                  sx={{
                    color: "#FFFFFF",
                   
                    "&:hover": { color: "#402E51" },
                  }}
                />
              </button>
            ) : (
              <button
                style={{ color: "#FFFFFF", background: "none", border: "none" }}
                onClick={() => {
                  props.setIsAdd(false);
                  dispatch(getFavourites());
                }}
              >
                <CloseIcon
                  sx={{
                    color: "#FFFFFF",
                   
                    "&:hover": { color: "#402E51" },
                  }}
                  onClick={()=>{   dispatch(getFavourites())}}
                />
              </button>
            )}
          </div>
        )}
        {!props.isAdd && (
          <div style={{ padding: 0 }}>
            {!props.isEdit ? (
              <button
                style={{ color: "#FFFFFF", background: "none", border: "none" }}
                onClick={() => props.setIsEdit(true)}
              >
                <BorderColorIcon
                  sx={{
                    color: "#FFFFFF",
                   
                    "&:hover": { color: "#402E51" },
                  }}
                />
              </button>
            ) : (
              <button
                style={{ color: "#FFFFFF", background: "none", border: "none" }}
                onClick={() => {
                  props.setIsEdit(false);
                  dispatch(getFavourites());
                }}
              >
                <CloseIcon
                  sx={{
                    color: "#FFFFFF",
                   
                    "&:hover": { color: "#402E51" },
                  }}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
