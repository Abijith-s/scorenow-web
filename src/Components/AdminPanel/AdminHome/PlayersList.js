import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPlayersForAdmin } from "../../../apiManager/services/adminServices";

export const PlayersList = () => {
  const dispatch = useDispatch();
  const [isSearch,setIsSearch]=useState(false)
  const styles = {
    textStyles: {
      fontSize: "2vw",
      fontWeight: 800,
      marginBottom: "1%",
    },
    parentHeaderDiv: { display: "flex" },
    headerDiv: {
      backgroundColor: "#2d2b3a",
      width: "60%",
      margin: "0% 1% 1% 1%",
      borderRadius: "2em",
    },
  };
  const searchResultPlayers = useSelector(
    (state) => state.favourites.searchResults?.data
  );
  const searchPlayers = (data) => {
    dispatch(searchPlayersForAdmin(data));
  };
  useEffect(()=>{
   
  },searchResultPlayers)

  return (
    <div style={{ justifyContent: "center" }}>
      <h3 style={styles.textStyles}>Players List</h3>
      <div className="col-sm-12" style={styles.parentHeaderDiv}>
        <div style={styles.headerDiv}>
          <div
            className="col-sm-12"
            style={{
              width: "100%",
              borderRadius: "2em",
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              style={{
                width: "100%",
                backgroundColor: " #FFFFFF",
                fontSize: "2vw",
                border: "none",
                height: "3vw",
                borderRadius: "2em",
                padding: "2%",
              }}
              onChange={(e) => {searchPlayers({ searchText: e.target.value });setIsSearch(true)}}
            />
          </div>
        </div>
      </div>
      {searchResultPlayers && searchResultPlayers !== [] &&isSearch? (
        searchResultPlayers?.map((e, index) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "50%",
              }}
              className="col-sm-12"
            >
              <>
                <div styles={{ padding: 0 }} className="col-sm-4">
                  <h5 style={styles.textStyles}>{e.fullname}</h5>
                </div>
                <div styles={{ padding: 0 }} className="col-sm-3">
                  <h5 style={styles.textStyles}>{e.id}</h5>
                </div>
              </>
            </div>
          );
        })
      ) : (
        <h1>nothing to show</h1>
      )}
    </div>
  );
};
