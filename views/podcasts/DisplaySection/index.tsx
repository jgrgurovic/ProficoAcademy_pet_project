"use client"
import React, { useEffect, useState } from "react"
import PodcastList from "./PodcastList"
import { PodcastEpisode } from "types/interfaces/PodcastEpisode"
import { SpotifyService } from "@/services/SpotifyService"
import { PODCAST_IDs, MAX_RESULTS } from "config/constants"

const Display = () => {
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([])
  const podcastIds: string[] = PODCAST_IDs

  useEffect(() => {
    console.log("Fetching podcast episodes...")

    const fetchPodcasts = async () => {
      try {
        const spotifyService = new SpotifyService()
        const allPodcastEpisodes: PodcastEpisode[] = []

        for (const podcastId of podcastIds) {
          const podcastEpisodes: PodcastEpisode[] =
            await spotifyService.fetchPodcastEpisodes(podcastId, MAX_RESULTS)
          allPodcastEpisodes.push(...podcastEpisodes)
        }
        allPodcastEpisodes.sort((a, b) => {
          return (
            new Date(b.publicationDate).getTime() -
            new Date(a.publicationDate).getTime()
          )
        })
        setPodcastEpisodes(allPodcastEpisodes)
      } catch (error) {
        console.error("Error fetching podcast episodes:", error)
      }
    }

    fetchPodcasts()
  }, [])

  return (
    <div>
      <PodcastList episodes={podcastEpisodes} />
    </div>
  )
}

export default Display
