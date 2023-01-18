import React from 'react'
import { Header } from './Header'
import UpcomingMatchListingCards from './UpComingMatchesListingCard'

export const UpcomingMatches = () => {
  return (
    <>
      <Header />
      <UpcomingMatchListingCards heading={"Upcoming Matches"} />
    </>
  )
}
