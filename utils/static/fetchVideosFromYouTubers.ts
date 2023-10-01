import { YoutubeService } from "@/services/YoutubeService"
import { PLAYLIST_IDs } from "config/constants"

export interface VideoItem {
  snippet: {
    title: string
    publishedAt: string
    channelTitle: string
    resourceId: {
      videoId: string
    }
    tags: string[]
    thumbnails: {
      default: {
        url: string
        width: number
        height: number
      }
      medium: {
        url: string
        width: number
        height: number
      }
      high: {
        url: string
        width: number
        height: number
      }
      standard: {
        url: string
        width: number
        height: number
      }
    }
  }
}

export const fetchVideosFromPlaylists = async (
  playlistIds: string[],
  maxResults: number
): Promise<VideoItem[]> => {
  try {
    const youtubeService = new YoutubeService()
    const videos = await youtubeService.fetchVideosFromPlaylists(
      playlistIds,
      maxResults
    )

    console.log("Fetched videos:", videos)
    return videos
  } catch (error) {
    console.error("An error occurred:", error)
    throw error
  }
}
;(async () => {
  try {
    const playlistIds: string[] = PLAYLIST_IDs
    const maxResults: number = 10

    const videosFromPlaylists: VideoItem[] = await fetchVideosFromPlaylists(
      playlistIds,
      maxResults
    )

    console.log("Fetched videos from playlists:", videosFromPlaylists)
  } catch (error) {
    console.error("An error occurred:", error)
  }
})()
