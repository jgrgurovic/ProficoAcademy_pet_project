"use client"
import React, { useEffect, useState } from "react"
import VideoList from "./VideoList"
import { VideoItem } from "types/interfaces/VideoItem"
import { YoutubeService } from "@/services/YoutubeService"
import { PLAYLIST_IDs, MAX_RESULTS } from "config/constants"

const Display = () => {
  const [videos, setVideos] = useState<VideoItem[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const youtubeService = new YoutubeService()
        const allVideos = await youtubeService.fetchVideosFromPlaylists(
          PLAYLIST_IDs,
          MAX_RESULTS
        )
        allVideos.sort((a, b) => {
          return (
            new Date(b.snippet.publishedAt).getTime() -
            new Date(a.snippet.publishedAt).getTime()
          )
        })
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
