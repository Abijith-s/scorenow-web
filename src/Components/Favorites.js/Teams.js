import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamsToFavourite,
  deleteTeamsFromFavourite,
} from "../../apiManager/services/favouriteServices";
import { useSnackbar } from "notistack";

export const Teams = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const teams = useSelector((state) => state.favourites.teams);
  const { favourites } = useSelector((state) => state.favourites);
  const [fvTeams, setfvTeams]=useState([])
  const [favouriteTeams, setFavouriteTeams] = useState([]);

  useEffect(() => {
    if (favourites?.teams?.length) {
      const array = favourites?.teams?.map((e) => {
        return e.id;
      });
      setFavouriteTeams(array);
    }
  }, [favourites]);
  const addMessage = (
    <span>
      Team added to favorites!
    </span>
  );
  const deleteMessage = (
    <span>
      deleted Team from favorites
    </span>
  );
  const handleTeamsDelete = (e) => {

    dispatch(deleteTeamsFromFavourite(e));
    enqueueSnackbar(deleteMessage, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
     
  };
  const deselect = (e) => {
    setFavouriteTeams((current) => current.filter((val) => val !== e.id));
    handleTeamsDelete(e);
  };
  useEffect(()=>{
    if(favourites?.teams?.length === 0){
      setFavouriteTeams([]);
    }
  },[props.isAdd]);



  const handleChange = (data) => {
    setFavouriteTeams((prev) => [...prev, data.id]);
    dispatch(addTeamsToFavourite(data));
    enqueueSnackbar(addMessage, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  
  useEffect(() => {
 
    if ( props.isAdd) {
      setfvTeams(teams);
    } else {
      setfvTeams(favourites.teams || []);
    }
  }, [props.isAdd, favourites.teams]);
   

  return (
    <>
      {props.isAdd && (
       <div style={{backgroundColor:"#fff",textAlign:"center",fontSize:"1.5rem",borderRadius:"2rem",padding:"1rem"}} >
       Add your favorite Teams 
     </div>
      )}
          <div className="container" style={{ marginTop: "1rem" }}>
        {fvTeams.length ? (
          fvTeams?.map((e, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar alt="0" src={e.image_path} />
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "1rem",
                      alignItems: "start",
                      flexDirection: "column",
                      color: "#ffff",
                    }}
                  >
                    <Typography variant="h6">{e.name}</Typography>
                    
                  </div>
                </div>
                {!props.isEdit ? (
                  favouriteTeams.includes(e.id) ? (
                    <FavoriteIcon
                      sx={{ color: "red" }}
                      onClick={() => {
                        deselect(e);
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      onClick={() => {
                        //  setindices([...indices, index]);
                        handleChange(e);
                      }}
                      sx={{ color: "#FFFFFF" }}
                    />
                  )
                ) : (
                  <DeleteIcon
                    onClick={() => {
                      handleTeamsDelete(e);
                    }}
                    sx={{
                      color: "#FFFFFF",
                      "&:hover": {
                        color: "red",
                      },
                    }}
                  />
                )}
              </div>
            );
          })
        ) : (
          <h1>No Teams found</h1>
        )}
      </div>
    </>
  );
};
