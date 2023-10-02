import React from "react"
import { VideoItem } from "types/interfaces/interface"
import VideoCard from "./VideoCard"

interface VideoListProps {
  videos: VideoItem[]
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-16 gap-y-24 m-24 ">
      {videos.map((video) => (
        <VideoCard key={video.snippet.resourceId.videoId} video={video} />
      ))}
    </div>
  )
}

export default VideoList
