import React,{useEffect} from 'react'
import FixtureMatchListingCards from './FixtureMatchListingCard'
import { Header } from './Header'

export const FixtureMatches = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header/>
      <FixtureMatchListingCards/>
    </>
  )
}
