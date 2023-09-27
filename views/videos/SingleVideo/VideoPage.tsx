import React from "react"
import VideoPlayer from "./VideoPlayer"
import { VideoItem } from "../../../utils/static/fetchVideosFromYouTubers"

interface VideoPageProps {
  video: VideoItem
}

const VideoPage: React.FC<VideoPageProps> = ({ video }) => {
  return (
    <div>
      <h1>{video.snippet.title}</h1>
      <div>
        <VideoPlayer src={video.snippet.resourceId.videoId} />
      </div>
      <div>
        <h2>Youtuber:</h2>
        <p>{video.snippet.channelTitle}</p>
        <h2>Date Posted</h2>
        <p>{video.snippet.publishedAt}</p>
      </div>
    </div>
  )
}

export default VideoPage
