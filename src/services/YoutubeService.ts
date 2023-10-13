import axios from "axios"
import { YOUTUBER_HEADERS } from "config/constants"
import { VideoItem } from "types/interfaces/VideoItem"

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
    maxResults: number,
    page: number,
    perPage: number
  ): Promise<VideoItem[]> {
    try {
      const part: string = "snippet"
      const allVideos: VideoItem[] = []

      for (const playlistId of playlistIds) {
        const response = await axios.get(
          "https://youtube-v31.p.rapidapi.com/playlistItems",
          {
            params: {
              playlistId: playlistId,
              part: part,
              maxResults: maxResults,
              page: page,
              perPage: perPage,
            },
            headers: YOUTUBER_HEADERS,
          }
        )

        const videos: VideoItem[] = response.data.items

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

      console.log("Fetched videos:", allVideos)
      return allVideos
    } catch (error) {
      console.error("Error fetching videos from playlists:", error)
      throw error
    }
  }
}
