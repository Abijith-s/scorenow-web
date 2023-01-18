import React,{useEffect} from "react";
import Cards from "../../Containers/Cards";
import { Header } from "./Header";

export const LiveMatches = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Header/>
      <Cards heading={"Live Matches"} />
    </>
  );
};
