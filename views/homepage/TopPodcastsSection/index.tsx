"use client"
import React, { useEffect, useState } from "react"
import SpotifyCard from "./SpotifyCard"
import firebaseService from "@/services/FirebaseService"
import { SpotifyCardProps } from "types/interfaces/SpotifyCardProps"

const TopPodcastsSection: React.FC = () => {
  const [podcastEpisodes, setPodcastEpisodes] = useState<
    SpotifyCardProps[] | null
  >(null)

  async function fetchNewestPodcastEpisodes() {
    try {
      const episodes = await firebaseService.getNewestContent()
      console.log(episodes)

      if (
        episodes &&
        episodes.newestEpisodes &&
        Array.isArray(episodes.newestEpisodes)
      ) {
        setPodcastEpisodes(episodes.newestEpisodes as SpotifyCardProps[])
      }
    } catch (error) {
      console.error("Error fetching podcast episodes:", error)
    }
  }

  useEffect(() => {
    fetchNewestPodcastEpisodes()
  }, [])

  return (
    <div>
      <h1 className="text-center text-4xl font-bold tracking-widest">
        Latest Podcasts
      </h1>
      <div className="flex justify-center my-24 mx-24 space-x-24">
        {podcastEpisodes?.map((episode) => (
          <SpotifyCard
            key={episode.id}
            id={episode.id}
            title={episode.title}
            coverArtUrl={episode.coverArtUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default TopPodcastsSection
