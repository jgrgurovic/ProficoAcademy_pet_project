import React from "react"
import YoutubeCard from "./YoutubeCard"

const TopVideosSection = () => {
  return (
    <div>
      <h1 className="text-center  text-4xl font-bold tracking-widest">
        Top Videos
      </h1>
      <div className="flex justify-center my-24 mx-24 space-x-48">
        <YoutubeCard />
        <YoutubeCard />
      </div>
    </div>
  )
}
export default TopVideosSection
