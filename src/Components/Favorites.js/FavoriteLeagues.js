import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeaguesToFavourite,
  deleteLeaguesFromFavourite,
} from "../../apiManager/services/favouriteServices";
import { useSnackbar } from "notistack";

export const FavoriteLeagues = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [favoriteLeagues, setFavouriteLeagues] = useState([]);
  const [fvLeagues,setFvLeagues] = useState([])
  const leagues = useSelector((state) => state.favourites.leagues);
  const { favourites } = useSelector((state) => state.favourites);

  const addMessage = (
    <span>
      League added to favorites!
    </span>
  );
  const deleteMessage = (
    <span>
      deleted league from favorites
    </span>
  );
  useEffect(() => {
    if (favourites?.leagues?.length) {
      const array = favourites?.leagues?.map((e) => {
        return e.id;
      });
      setFavouriteLeagues(array);
    }
  }, [favourites]);


  const handleChange = (data) => {
    setFavouriteLeagues((prev) => [...prev, data.id]);
    dispatch(addLeaguesToFavourite(data));
    enqueueSnackbar(addMessage, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const handleLeaguesDelete = (e) => {
    dispatch(deleteLeaguesFromFavourite(e));
    enqueueSnackbar(deleteMessage, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
    
  };
  const deselect = (e) => {
    setFavouriteLeagues((current) => current.filter((val) => val !== e.id));
    handleLeaguesDelete(e);
  };
  useEffect(()=>{
    if(favourites?.leagues?.length === 0){
      setFavouriteLeagues([]);
    }
  },[props.isAdd]);
 
  useEffect(() => {
 
    if ( props.isAdd) {
      setFvLeagues(leagues);
    } else {
      setFvLeagues(favourites.leagues || []);
    }
  }, [props.isAdd, favourites.teams]);
  return (
    <>
      {props.isAdd && (
         <div style={{backgroundColor:"#fff",textAlign:"center",fontSize:"1.5rem",borderRadius:"2rem",padding:"1rem"}} >
         Add your favorite Leagues   
       </div>
      )}
          <div className="container" style={{ marginTop: "1rem" }}>
        {fvLeagues.length ? (
          fvLeagues?.map((e, index) => {
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
                  favoriteLeagues.includes(e.id) ? (
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
                      handleLeaguesDelete(e);
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
          <h1>No Leagues found</h1>
        )}
      </div>
    </>
  );
};
