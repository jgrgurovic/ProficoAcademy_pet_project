import React from "react"
import { PodcastEpisode } from "types/interfaces/PodcastEpisode"
import PodcastEpisodeCard from "./PodcastEpisodeCard"

interface PodcastListProps {
  episodes: PodcastEpisode[]
  currentPage: number
  itemsPerPage: number
}

const PodcastList: React.FC<PodcastListProps> = ({
  episodes,
  currentPage,
  itemsPerPage,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const episodesToDisplay = episodes.slice(startIndex, endIndex)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-24 m-24 ">
      {episodesToDisplay.map((episode) => (
        <PodcastEpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  )
}

export default PodcastList
