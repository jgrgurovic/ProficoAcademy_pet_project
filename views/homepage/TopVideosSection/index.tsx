"use client"
import React, { useEffect, useState } from "react"
import YoutubeCard from "./YoutubeCard"
import firebaseService from "@/services/FirebaseService"

interface VideoItem {
  id: string
  snippet: {
    title: string
    description: string
    channelTitle: string
    resourceId: {
      videoId: string
    }
    thumbnails: {
      high: {
        url: string
      }
    }
  }
}

const TopVideosSection: React.FC = () => {
  const [youtubeVideos, setYoutubeVideos] = useState<VideoItem[] | null>(null)

  async function fetchNewestYouTubeVideos() {
    try {
      const videos = await firebaseService.getNewestContent()

      if (videos && videos.newestVideos && Array.isArray(videos.newestVideos)) {
        setYoutubeVideos(videos.newestVideos as VideoItem[])
      }
    } catch (error) {
      console.error("Error fetching YouTube videos:", error)
    }
  }

  useEffect(() => {
    fetchNewestYouTubeVideos()
  }, [])

  return (
    <div>
      <h1 className="text-center text-4xl font-bold tracking-widest">
        Lastest Videos
      </h1>
      <div className="flex justify-center my-12 mx-24 space-x-48">
        {youtubeVideos?.map((video) => (
          <YoutubeCard
            key={video.id}
            title={video.snippet.title}
            channelTitle={video.snippet.channelTitle}
            videoId={video.snippet.resourceId.videoId}
            thumbnailUrl={video.snippet.thumbnails.high.url}
          />
        ))}
      </div>
    </div>
  )
}

export default TopVideosSection
