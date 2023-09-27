import axios from "axios"

export interface VideoItem {
  snippet: {
    title: string
    publishedAt: string
    channelTitle: string
    resourceId: {
      videoId: string
    }
    tags: string
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

const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY

export const fetchVideosFromPlaylists = async (
  channelIds: string[],
  playlistIds: string[],
  maxResults: number
): Promise<VideoItem[]> => {
  try {
    const part: string = "snippet"

    const allVideos: VideoItem[] = []

    for (const channelId of channelIds) {
      for (const playlistId of playlistIds) {
        const response = await axios.get(
          "https://youtube-v31.p.rapidapi.com/playlistItems",
          {
            params: {
              playlistId: playlistId,
              part: part,
              maxResults: maxResults,
            },
            headers: {
              "X-RapidAPI-Key": apiKey,
              "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
              "Cache-Control": "no-cache",
            },
          }
        )

        const videos: VideoItem[] = response.data.items
        allVideos.push(...videos)
      }
    }

    console.log("Fetched videos:", allVideos)
    return allVideos
  } catch (error) {
    console.error("Error fetching videos from playlists:", error)
    throw error
  }
}
;(async () => {
  try {
    const channelIds: string[] = ["UCtNdVINwfYFTQEEZgMiQ8FA"]
    const playlistIds: string[] = ["PLCprSpAj-wvAf6l9ulK_2B_4BrHJM4j1s"]
    const maxResults: number = 10

    const videosFromPlaylists: VideoItem[] = await fetchVideosFromPlaylists(
      channelIds,
      playlistIds,
      maxResults
    )
  } catch (error) {
    console.error("An error occurred:", error)
  }
})()
