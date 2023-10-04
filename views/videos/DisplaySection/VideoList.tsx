import React from "react"
import { VideoItem } from "types/interfaces/VideoItem"
import VideoCard from "./VideoCard"

interface VideoListProps {
  videos: VideoItem[]
  currentPage: number
  itemsPerPage: number
}

const VideoList: React.FC<VideoListProps> = ({
  videos,
  currentPage,
  itemsPerPage,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const videosToDisplay = videos.slice(startIndex, endIndex)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-16 gap-y-24 m-24 ">
      {videosToDisplay.map((video) => (
        <VideoCard key={video.snippet.resourceId.videoId} video={video} />
      ))}
    </div>
  )
}

export default VideoList
