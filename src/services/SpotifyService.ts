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
    maxResults: number,
    page: number,
    perPage: number
  ) {
    try {
      const firebaseEpisodes: PodcastEpisode[] = []
      const db = getDatabase(firebaseApp)
      const episodesRef = ref(db, "data/podcasts/episodes")
      const existingEpisodesSnapshot = await get(episodesRef)
      const existingEpisodes: PodcastEpisode[] =
        existingEpisodesSnapshot.val() || []

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
          page: page,
          perPage: perPage,
        },
        headers: SPOTIFY_HEADERS,
      }

      const response = await axios.request(options)
      const episodesData =
        response.data.data?.podcastUnionV2?.episodesV2?.items || []

      const podcastEpisodes: any[] = episodesData.map((episodeData: any) => {
        const {
          entity: {
            data: {
              audio: { items: audioItems = [] } = {},
              coverArt: { sources: coverArtSources = [] } = {},
              id = "N/A",
              name: title = "N/A",
              description = "N/A",
              duration: { totalMilliseconds = 0 } = {},
              releaseDate: { isoString: rawPublicationDate = "N/A" } = {},
              podcastV2: { data: { name: podcastName = "N/A" } = {} } = {},

            } = {},
          } = {},
          uid = "",
        } = episodeData

        const audioUrl = audioItems.length > 0 ? audioItems[0]?.url || "" : ""
        const coverArtUrl =
          coverArtSources.length > 0 ? coverArtSources[1]?.url || "" : ""
        const publicationDate = new Date(rawPublicationDate)
        const formattedPublicationDate = publicationDate
          .toISOString()
          .split("T")[0]

        return {
          id: id,
          title,
          description: description,
          audioUrl: audioUrl,
          coverArtUrl: coverArtUrl,
          duration: totalMilliseconds > 0 ? totalMilliseconds / 1000 : 0,
          publicationDate: formattedPublicationDate,
          uid: uid,

          podcastName: podcastName,
        }
      })
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
      }

      return podcastEpisodes
    } catch (error) {
      console.error("Error fetching podcast episodes:", error)
      throw error
    }
  }
}
