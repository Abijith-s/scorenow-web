import React from "react";
import { Link } from "react-router-dom";

export const FixtureOrFinishedMatchCard = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(90deg,  #4d004d, #990099, #4d004d)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
        backgroundRepeat: "repeat",
        height: "auto",
        flexGrow: "column",
        top: "1em",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#161c2c",
          justifyContent: "space-between",
        }}
        className="col-sm-12"
      >
        <div>
          <h1 style={{ color: "white" }}>MatchCard</h1>
        </div>
        <div>
          <Link to="/">
            <button style={{ color: "black" }} s>
              <h1>Go back</h1>
            </button>
          </Link>
        </div>
      </div>
      <div
        className="col-sm-12 container"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="col-sm-2"></div>
        <div className="col-sm-2">
          {/* <img
            alt="logo1"
            src="images/somelogo.png"
            style={{
              height: "90%",
              width: "90%",
              paddingLeft: "1em",
              float: "right",
            }}
          /> */}
        </div>
        <div
          className="col-sm-4"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontWeight: "1000",
              textAlign: "center",
              fontSize: "3em",
              padding: "1em 0 0 0.1em",
              fontStyle: "italic",
            }}
          >
            CSK &nbsp;
          </h1>
          <t />
          <h6
            style={{
              color: "white",
              fontWeight: "1000",
              textAlign: "center",
              fontSize: "3em",
              padding: "1em 0 0 0.1em",
              fontStyle: "italic",
            }}
          >
            VS &nbsp;
          </h6>
          <t />
          <h1
            style={{
              color: "white",
              fontWeight: "1000",
              textAlign: "center",
              fontSize: "3em",
              padding: "1em 0 0 0",
              fontStyle: "italic",
            }}
          >
            MI
          </h1>
        </div>
        <div className="col-sm-2">
          {/* <img
            alt="logo1"
            src="images/logo.png"
            style={{
              height: "90%",
              width: "90%",
              paddingLeft: "1em",
              float: "left",
            }}
          /> */}
        </div>
        <div className="col-sm-2"></div>
      </div>
      <div
        className="col-sm-12"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <div
          className="col-sm-5"
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="images/somelogo.png"
            alt="avatar"
            style={{ width: "100%", maxHeight: "20em", padding: 0 }}
          />
          <div
            style={{
              backgroundColor: "#ff9900",
              marginTop: 0,
              height: "5em",
              width: "100%",
              borderRadius: "5em",
              display: "flex",
              justifyContent: "initial",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffcc00",
                marginTop: 0,
                borderRadius: "5em",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "70%",
              }}
            >
              <h1
                style={{
                  color: "white",
                  textDecoration: "italic",
                  padding: "0.4em",
                  fontWeight: "1000",
                }}
              >
                CSK
              </h1>
            </div>
            <h1
              style={{
                color: "white",
                textDecoration: "italic",
                padding: "0.4em",
                display: "flex",
                justifyContent: "end",
                fontWeight: "1000",
              }}
            >
              30
              <sub
                style={{
                  fontWeight: "200",
                  marginTop: "2em",
                  fontSize: "0.5em",
                }}
              >
                12
              </sub>
            </h1>
          </div>
        </div>
        <div
          className="col-sm-2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                flexDirection: "row",
              }}
            >
              <h6
                style={{ fontSize: "2em", color: "white", fontWeight: "500" }}
              >
                MI 189/8
              </h6>
            </div>
            <div>
              <h1
                style={{ fontSize: "6em", color: "white", fontWeight: "900" }}
              >
                75/3
              </h1>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* <img
              src="../images/avatar.png"
              alt="avatar"
              style={{
                width: "100%",
                maxHeight: "6em",
                padding: 0,
                marginBottom: "5em",
              }}
            /> */}
            <div
              style={{
                backgroundColor: "#000066",
                height: "60%",
                width: "45%",
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                marginLeft: "30%",
                bottom: 0,
                flexDirection: "column",
                position: "absolute",
              }}
            >
              <h3
                style={{ color: "white", textAlign: "center", padding: "10%", fontWeight:"1000" }}
              >
                5.1
              </h3>
            </div>
          </div>
        </div>
        <div
          className="col-sm-5"
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="images/logo.png"
            alt="avatar"
            style={{ width: "100%", maxHeight: "20em" }}
          />
          <div
            style={{
              backgroundColor: "#ff9900",
              marginTop: 0,
              height: "5em",
              width: "100%",
              borderRadius: "5em",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <h1
              style={{
                color: "white",
                textDecoration: "italic",
                padding: "0.4em",
                display: "flex",
                justifyContent: "end",
                fontWeight: "1000",
              }}
            >
              <sub
                style={{
                  fontWeight: "200",
                  marginTop: "2em",
                  fontSize: "0.5em",
                }}
              >
                12
              </sub>
              30
            </h1>
            <div
              style={{
                backgroundColor: "#ffcc00",
                marginTop: 0,
                borderRadius: "5em",
                display: "flex",
                width: "70%",
                justifyContent:"end"
              }}
            >
              <h1
                style={{
                  color: "white",
                  textDecoration: "italic",
                  padding: "0.4em",
                  fontWeight: "1000",
                }}
              >
               MI
              </h1>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div className="col-sm-12" style={{padding:"1.2em"}}></div>
      <div className="col-sm-4"></div>
      <div
        style={{
          backgroundColor: "#2e5cb8",
          height: "2em",
          width: "30%",
          borderRadius: "5em",
          display: "flex",
          justifyContent: "initial",
          marginTop:"5em"
        }}
      >
        <div
          style={{
            backgroundColor: "#000066",
            marginTop: 0,
            borderRadius: "5em",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "70%",
          }}
        >
          <h3
            style={{
              color: "white",
              textDecoration: "italic",
              padding: "0.4em",
              fontWeight: "1000",
            }}
          >
            Malinga
          </h3>
        </div>
        <h4
          style={{
            color: "white",
            textDecoration: "italic",
            display: "flex",
            justifyContent: "end",
            fontWeight: "1000",
            padding:"0.2em"
          }}
        >
          2.1/16-<sub style={{fontSize:"2em",marginTop:0}}>2</sub>
        </h4>
        {/* <h2>2</h2> */}
      </div>
      <div className="col-sm-4"></div>
      <div className="col-sm-12" style={{display:"flex",flexDirection:"initial", color:"white"}}>
        <h1>SCORENOW</h1>
      </div>
    </div>
  );
};
