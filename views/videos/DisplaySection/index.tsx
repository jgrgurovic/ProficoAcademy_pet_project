"use client"
import React, { useEffect, useState } from "react"
import VideoList from "./VideoList"
import {
  fetchVideosFromPlaylists,
  VideoItem,
} from "@utils/static/fetchVideosFromYouTubers"
import { PLAYLIST_IDs } from "config/constants"

const Display = () => {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const playlistIds = PLAYLIST_IDs
  const maxResults = 10

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const allVideos: VideoItem[] = []

        for (const playlistId of playlistIds) {
          const videosFromPlaylists: VideoItem[] =
            await fetchVideosFromPlaylists([playlistId], maxResults)

          allVideos.push(...videosFromPlaylists)
        }

        console.log("Fetched videos:", allVideos)
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
