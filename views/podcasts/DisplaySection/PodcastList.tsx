import React from "react"
import { PodcastEpisode } from "types/interfaces/PodcastEpisode"
import PodcastEpisodeCard from "./PodcastEpisodeCard"

interface PodcastListProps {
  episodes: PodcastEpisode[]
}

const PodcastList: React.FC<PodcastListProps> = ({ episodes }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-24 m-24 ">
    {episodes.map((episode, index) => (
      <PodcastEpisodeCard key={index} episode={episode} />
    ))}
  </div>
)

export default PodcastList
