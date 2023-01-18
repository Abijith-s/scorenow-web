import { Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlayersToFavourite,
  deletePLayersFromFavourite,
  getFavourites,
  getPlayers,
  searchForPlayers,
} from "../../apiManager/services/favouriteServices";
import { useSnackbar } from "notistack";

export const Players = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const players = useSelector((state) => state.favourites.players);
  const searchResultPlayers = useSelector(
    (state) => state.favourites?.searchResults?.data
  );
  const [playersData, setPlayersData] = useState(players || []);
  const [isSearch, setIsSearch] = useState(false);
  // const [indices, setindices] = useState([]);
  const { favourites } = useSelector((state) => state.favourites);
  const [favoritePlayers, setFavouritePlayers] = useState([]);


  useEffect(() => {
    if (favourites?.players?.length) {
      const array = favourites?.players?.map((e) => {
        return e.id;
      });
      setFavouritePlayers(array);
    }
  }, [favourites.players]);

  const addMessage = <span>Player added to favorites!</span>;
  const deleteMessage = <span>deleted player from favorites</span>;
  useEffect(() => {
    dispatch(getPlayers());
  }, []);

  useEffect(() => {
    if (favourites?.players?.length === 0) {
      setFavouritePlayers([]);
    }
 
  }, [props.isAdd]);

  const handlePlayersDelete = (e) => {
    dispatch(deletePLayersFromFavourite(e));
    enqueueSnackbar(deleteMessage, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
    setFavouritePlayers((current) => current.filter((val) => val !== e.id));

  };

  const deselect = (e) => {
 
    setFavouritePlayers((current) => current.filter((val) => val !== e.id));
    if (  !props.isAdd){
      setPlayersData((prev)=> {
        return  prev.filter(val=> val.id !== e.id)
      })
    }
  
    handlePlayersDelete(e);
  };

  const handleChange = (data) => {
    setFavouritePlayers((prev) => [...prev, data.id]);
    dispatch(addPlayersToFavourite(data));
    enqueueSnackbar(addMessage, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const searchPlayers = (data) => {
    if (data.searchText && props.isAdd) {
      setIsSearch(true);
      dispatch(searchForPlayers(data));
    } else {
      setIsSearch(false);
    }
  };
  // useEffect(() => {}, [searchResultPlayers, favourites]);
  useEffect(() => {
   
    if (isSearch && props.isAdd) {
      setPlayersData(searchResultPlayers);
    } else if (!isSearch && props.isAdd) {
      setPlayersData(players);
    } else {
      setPlayersData(favourites.players || []);
    }
  }, [isSearch, props.isAdd, searchResultPlayers, favourites.players]);
  return (
    <>
      {props.isAdd ? (
        <div className="form-wrapper" style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => searchPlayers({ searchText: e.target.value })}
            style={{ marginTop: "0.5em", width: "100%" }}
          />
        </div>
      ) : null}
      <div className="container" style={{ marginTop: "1rem" }}>
        {playersData.length ? (
          playersData?.map((e, index) => {
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
                    <Typography variant="h6">{e.fullname}</Typography>
                    <span style={{ marginTop: "-5px" }}>{e.position.name}</span>
                  </div>
                </div>
                {!props.isEdit ? (
                  favoritePlayers.includes(e.id) ? (
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
                      handlePlayersDelete(e);
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
          <h1>No players found</h1>
        )}
      </div>
    </>
  );
};
