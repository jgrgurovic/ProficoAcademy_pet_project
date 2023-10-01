"use client"
import React, { useEffect, useState } from "react"
import PodcastList from "./PodcastList"
import {
  PodcastEpisode,
  fetchPodcastEpisodes,
} from "@utils/static/fetchPodcastsFromSpotify"
import { PODCAST_IDs } from "config/constants"

const Display = () => {
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([])
  const podcastIds: string[] = PODCAST_IDs
  const maxResults: number = 10

  useEffect(() => {
    console.log("Fetching podcast episodes...")

    const fetchPodcasts = async () => {
      try {
        const allPodcastEpisodes: PodcastEpisode[] = []

        for (const podcastId of podcastIds) {
          const podcastEpisodes: PodcastEpisode[] = await fetchPodcastEpisodes(
            podcastId,
            maxResults
          )
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
