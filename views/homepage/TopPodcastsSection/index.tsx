import React from "react"
import SpotifyCard from "./SpotifyCard"

const TopPodcastsSection = () => {
  return (
    <div>
      <h1 className="text-center  text-4xl font-bold tracking-widest">
        Top Podcasts
      </h1>
      <div className="flex justify-center my-24 mx-24 space-x-24">
        <SpotifyCard />
        <SpotifyCard />
      </div>
    </div>
  )
}

export default TopPodcastsSection
