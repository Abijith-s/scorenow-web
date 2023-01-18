import React,{useEffect} from 'react'
import FinishedMatchListingCards from './FinishedMatchListingCards'
import { Header } from './Header'

export const FinishedMatches = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <FinishedMatchListingCards heading={"Finished Matches"} />
    </>
  )
}


