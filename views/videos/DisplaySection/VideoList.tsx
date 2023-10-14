import React from "react"
import { VideoItem } from "types/interfaces/VideoItem"
import VideoCard from "./VideoCard"

interface VideoListProps {
  videos: VideoItem[]
  searchQuery: string
  currentPage: number
  itemsPerPage: number
  selectedYoutuber: string | null
}

const VideoList: React.FC<VideoListProps> = ({
  videos,
  searchQuery,
  currentPage,
  itemsPerPage,
  selectedYoutuber,
}) => {
  const filteredVideos = videos.filter((video) =>
    video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const videoDisplay = selectedYoutuber
    ? filteredVideos.filter(
        (video) =>
          video.snippet.channelTitle.toLowerCase() ===
          selectedYoutuber.toLowerCase()
      )
    : filteredVideos
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const videosToDisplay = videoDisplay.slice(startIndex, endIndex)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-16 gap-y-24 m-24">
      {videosToDisplay.map((video) => {
        const {
          snippet: {
            resourceId: { videoId },
          },
        } = video
        return <VideoCard key={videoId} video={video} />
      })}
    </div>
  )
}

export default VideoList
