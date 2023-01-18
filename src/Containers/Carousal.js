import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { API } from "../apiManager/endPoints";
 const Carousal= () => {
  // const upcomingMatchDetails = useSelector(
  //   (state) => state.cricketReducer?.upcomingMatchDetails
  // );

  // upcomingMatchDetails?.sort(function(a,b){
  //   // Turn your strings into dates, and then subtract them
  //   // to get a value that is either negative, positive, or zero.
  //   return new Date(a.date) - new Date(b.date);
  // });
  return(
<>
    <Carousel
      autoPlay="true"
      infiniteLoop="true"
      interval={2000}
      showThumbs={false}
      animationHandler="fade"
    >
      <div>
        <img
          alt=""
          src={API.GET_BANNER_IMAGE}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
            "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80";
          }}
          style={{ maxHeight: "600px" }}
        />
      </div>
      <div>
        <img
          alt=""
          src="https://images.unsplash.com/photo-1562077772-3bd90403f7f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
          style={{ maxHeight: "600px" }}
        />
      </div>
    </Carousel>
  </>
  )
  
 };
export default Carousal;