import { SpotifyService } from "@/services/SpotifyService"
import { PODCAST_IDs } from "config/constants"

export interface PodcastEpisode {
  id: string
  title: string
  name: string
  description: string
  audioUrl: string
  audio: {
    items: {
      url: string
    }[]
  }
  coverArt: {
    sources: {
      url: string
    }[]
  }
  duration: {
    totalMilliseconds: number
  }
  releaseDate: {
    isoString: string
  }
  publicationDate: string
  podcastName: string
  coverArtUrl: string
  uid: string
  podcastV2: {
    data: {
      name: string
      coverArt: string
    }
  }
}

export const fetchPodcastEpisodes = async (
  podcastId: string,
  maxResults: number
): Promise<PodcastEpisode[]> => {
  try {
    const spotifyService = new SpotifyService()
    const podcastEpisodes: PodcastEpisode[] =
      await spotifyService.fetchPodcastEpisodes(podcastId, maxResults)

    console.log("Fetched podcast episodes:", podcastEpisodes)
    return podcastEpisodes
  } catch (error) {
    console.error("Error fetching podcast episodes:", error)
    throw error
  }
}
;(async () => {
  try {
    const podcastIds: string[] = PODCAST_IDs
    const maxResults: number = 10

    const allPodcastEpisodes: PodcastEpisode[] = []

    for (const podcastId of podcastIds) {
      const podcastEpisodes: PodcastEpisode[] = await fetchPodcastEpisodes(
        podcastId,
        maxResults
      )
      allPodcastEpisodes.push(...podcastEpisodes)
    }
  } catch (error) {
    console.error("An error occurred:", error)
  }
})()
