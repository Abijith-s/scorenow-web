import React from "react";

export const About = () => {
  return (
    <div
      style={{
        display: "flex",
        
        padding: "2rem",
        minHeight:"90vh",
        flexDirection: "column",
        background:"#000"
      }}
    >
      <div style={{ display: "flex", color:"#ffff", justifyContent: "center", marginBottom:"1rem" }}>
        <h1>ABOUT US</h1>
      </div>
      <div
        style={{ color: "white", display: "flex", justifyContent: "center",flexDirection:"column" }}
      >
        <p style={{ fontSize: "1.5em" }}>
          <strong>"Scorenow"</strong> is a sports-related website. We provide
          details of cricket matches including live scores and cricket news. Our
          aim is to make sports accessible to all without any discrimination.
        </p>
        <p style={{ fontSize: "1.5em" }}>
          We also have a mobile app on Play Store. Anyone can access live
          matches from any platform. Also, there are cricket news, team ranking,
          and many other details. In future we plan to include all sports like
          Football, Hockey, Tennis...
        </p>
        <p style={{ fontSize: "1.5em" }}>
          We believe that sports are a medium to bring people together. Everyone
          enjoys sports without discrimination. <strong>"Scorenow"</strong> is the best platform to
          enjoy your favorite sport. We are happy to provide you with our
          service.
        </p>
      </div>
    </div>
  );
};
