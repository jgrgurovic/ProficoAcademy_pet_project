import React from "react"
import { PodcastEpisode } from "types/interfaces/PodcastEpisode"
import PodcastEpisodeCard from "./PodcastEpisodeCard"

interface PodcastListProps {
  episodes: PodcastEpisode[]
  searchQuery: string
  currentPage: number
  itemsPerPage: number
  selectedPodcast: string | null
}

const PodcastList: React.FC<PodcastListProps> = ({
  episodes,
  searchQuery,
  currentPage,
  itemsPerPage,
  selectedPodcast,
}) => {
  const filteredEpisodes = episodes.filter((episode) =>
    episode.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const episodeDisplay = selectedPodcast
    ? filteredEpisodes.filter(
        (episode) =>
          episode.podcastName.toLowerCase() === selectedPodcast.toLowerCase()
      )
    : filteredEpisodes
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const episodesToDisplay = episodeDisplay.slice(startIndex, endIndex)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-24 m-24 ">
      {episodesToDisplay.map((episode) => (
        <PodcastEpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  )
}

export default PodcastList
