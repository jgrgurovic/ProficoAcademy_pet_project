import React from "react"
import VideoPlayer from "./VideoPlayer"
import { VideoItem } from "types/interfaces/interface"

interface VideoPageProps {
  video: VideoItem
}

const VideoPage: React.FC<VideoPageProps> = ({ video }) => {
  const { title, resourceId, channelTitle, publishedAt } = video.snippet
  const { videoId } = resourceId

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <VideoPlayer src={videoId} />
      </div>
      <div>
        <h2>Youtuber:</h2>
        <p>{channelTitle}</p>
        <h2>Date Posted</h2>
        <p>{publishedAt}</p>
      </div>
    </div>
  )
}

export default VideoPage
