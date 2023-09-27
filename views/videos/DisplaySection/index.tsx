"use client"
import React, { useEffect, useState } from "react"
import VideoList from "./VideoList"
import {
  fetchVideosFromPlaylists,
  VideoItem,
} from "../../../utils/static/fetchVideosFromYouTubers"

const Display = () => {
  const [videos, setVideos] = useState<VideoItem[]>([])

  useEffect(() => {
    const channelIds = ["UCtNdVINwfYFTQEEZgMiQ8FA"]
    const playlistIds = ["PLCprSpAj-wvAf6l9ulK_2B_4BrHJM4j1s"]

    const fetchVideos = async () => {
      try {
        const allVideos: VideoItem[] = []

        for (const channelId of channelIds) {
          for (const playlistId of playlistIds) {
            const videosFromPlaylists: VideoItem[] =
              await fetchVideosFromPlaylists([channelId], [playlistId], 10)

            allVideos.push(...videosFromPlaylists)
          }
        }

        setVideos(allVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      }
    }

    fetchVideos()
  }, [])

  return (
    <div>
      <VideoList videos={videos} />
    </div>
  )
}

export default Display
