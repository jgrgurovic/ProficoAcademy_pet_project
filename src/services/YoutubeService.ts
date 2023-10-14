import axios from "axios"
import { YOUTUBER_HEADERS } from "config/constants"
import { VideoItem } from "types/interfaces/VideoItem"
import { getDatabase, ref, set, get } from "firebase/database"
import firebaseApp from "@config/firebase"

export class YoutubeService {
  async fetchVideo(id: string) {
    try {
      if (id) {
        const response = await axios.get(
          `https://youtube-v31.p.rapidapi.com/videos?id=${id}`,
          {
            params: {
              part: "snippet,statistics",
            },
            headers: YOUTUBER_HEADERS,
          }
        )

        if (
          response.data &&
          response.data.items &&
          response.data.items.length > 0
        ) {
          return response.data.items[0]
        } else {
          console.error("No video data found for the provided ID:", id)
          return null
        }
      } else {
        console.warn("No video ID provided.")
        return null
      }
    } catch (error) {
      console.error("Error fetching video data:", error)
      throw error
    }
  }
  async fetchVideosFromPlaylists(
    playlistIds: string[],
    maxResults: number
  ): Promise<VideoItem[]> {
    try {
      const part: string = "snippet"
      const allVideos: VideoItem[] = []
      const firebaseVideos: VideoItem[] = []

      const db = getDatabase(firebaseApp)
      const videosRef = ref(db, "data/content")
      const existingVideosSnapshot = await get(videosRef)
      const existingVideos: VideoItem[] = existingVideosSnapshot.val() || []

      const existingVideoIds = new Set(
        existingVideos.map((video) => video.snippet.resourceId.videoId)
      )

      for (const playlistId of playlistIds) {
        const response = await axios.get(
          "https://youtube-v31.p.rapidapi.com/playlistItems",
          {
            params: {
              playlistId: playlistId,
              part: part,
              maxResults: maxResults,
            },
            headers: YOUTUBER_HEADERS,
          }
        )

        const videos: VideoItem[] = response.data.items

        for (const video of videos) {
          const videoId = video.snippet.resourceId.videoId

          if (!existingVideoIds.has(videoId)) {
            firebaseVideos.push(video)
            existingVideoIds.add(videoId)
          }
        }

        const uniqueVideos = videos.filter(
          (video, index, self) =>
            index ===
            self.findIndex(
              (v) =>
                v.snippet.resourceId.videoId ===
                video.snippet.resourceId.videoId
            )
        )

        allVideos.push(...uniqueVideos)
      }

      if (firebaseVideos.length > existingVideos.length) {
        await set(videosRef, firebaseVideos)
      }

      return allVideos
    } catch (error) {
      console.error("Error fetching videos from playlists:", error)
      throw error
    }
  }
}
