import axios from "axios"
import { SPOTIFY_HEADERS } from "constants/constants"

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

const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY

export const fetchPodcastEpisodes = async (
  podcastId: string,
  maxResults: number
): Promise<PodcastEpisode[]> => {
  try {
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/podcast_episodes/",
      params: {
        id: podcastId,
        offset: "0",
        limit: maxResults.toString(),
      },
      headers: SPOTIFY_HEADERS,
    }

    const response = await axios.request(options)
    const episodesData =
      response.data.data?.podcastUnionV2?.episodesV2?.items || []
    const coverArtSources = episodesData.coverArt?.sources || []
    const coverArtUrl =
      coverArtSources.length > 0 ? coverArtSources[1]?.url || "" : ""

    const podcastEpisodes: PodcastEpisode[] = episodesData.map(
      (episodeData: any) => {
        const audioItems = episodeData.entity?.data?.audio?.items || []
        const audioUrl = audioItems.length > 0 ? audioItems[0]?.url || "" : ""

        const coverArtSources =
          episodeData.entity?.data?.coverArt?.sources || []
        const coverArtUrl =
          coverArtSources.length > 0 ? coverArtSources[1]?.url || "" : ""

        const rawPublicationDate =
          episodeData.entity?.data?.releaseDate?.isoString || "N/A"
        const publicationDate = new Date(rawPublicationDate)
        const formattedPublicationDate = publicationDate
          .toISOString()
          .split("T")[0]

        return {
          id: episodeData.entity?.data?.id,
          title: episodeData.entity?.data?.name || "N/A",
          description: episodeData.entity?.data?.description || "N/A",
          audioUrl: audioUrl,
          coverArtUrl: coverArtUrl,
          duration: episodeData.entity?.data?.duration?.totalMilliseconds
            ? episodeData.entity.data.duration.totalMilliseconds / 1000
            : 0,
          publicationDate: formattedPublicationDate,
          uid: episodeData.uid || "",
        }
      }
    )

    console.log("Fetched podcast episodes:", podcastEpisodes)
    return podcastEpisodes
  } catch (error) {
    console.error("Error fetching podcast episodes:", error)
    throw error
  }
}
;(async () => {
  try {
    const podcastIds: string[] = [
      "3DgfoleqaW61T2amZQKINx",
      "4t4nuhMponRkNpX6xKFVNZ",
      "4d6RwH9XKnZ6osfNVc26eJ",
    ]
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
