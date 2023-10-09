import axios from "axios"
import { getDatabase, ref, set, get } from "firebase/database"
import firebaseApp from "@config/firebase"
import { SPOTIFY_HEADERS } from "config/constants"
import { PodcastEpisode } from "types/interfaces/PodcastEpisode"

export class SpotifyService {
  async fetchEpisode(id: string) {
    try {
      const response = await axios.get(
        `https://spotify23.p.rapidapi.com/episode/?id=${id}`,
        { headers: SPOTIFY_HEADERS }
      )
      if (response.data?.data?.episodeUnionV2) {
        return response.data.data.episodeUnionV2
      } else {
        console.error("No episode data found for the provided ID:", id)
        return null
      }
    } catch (error) {
      console.error("Error fetching episode data:", error)
      throw error
    }
  }

  async fetchPodcastEpisodes(
    podcastId: string,
    maxResults: number
  ): Promise<any[]> {
    try {
      const firebaseEpisodes: PodcastEpisode[] = []
      const db = getDatabase(firebaseApp)
      const episodesRef = ref(db, "data/podcasts/episodes")
      const existingEpisodesSnapshot = await get(episodesRef)
      const existingEpisodes: PodcastEpisode[] =
        existingEpisodesSnapshot.val() || []
      console.log("Existing episodes:", existingEpisodes)

      const existingEpisodeIds = new Set(
        existingEpisodes.map((episodeData) => episodeData.id)
      )
      
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

      const podcastEpisodes: any[] = episodesData.map((episodeData: any) => {
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
          id: episodeData.entity?.data?.id || "N/A",
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
      })

      for (const podcastEpisode of podcastEpisodes) {
        const episodeID = podcastEpisode.id
        if (!existingEpisodeIds.has(episodeID)) {
          firebaseEpisodes.push(podcastEpisode)
          existingEpisodeIds.add(episodeID)
        }
      }

      if (firebaseEpisodes.length > 0) {
        const updatedEpisodes = existingEpisodes.concat(firebaseEpisodes)
        await set(episodesRef, updatedEpisodes)
        console.log("Firebase episodes:", updatedEpisodes)
      }

      console.log("Fetched podcast episodes:", podcastEpisodes)

      return podcastEpisodes
    } catch (error) {
      console.error("Error fetching podcast episodes:", error)
      throw error
    }
  }
}
