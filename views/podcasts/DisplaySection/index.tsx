"use client"
import React, { useEffect, useState } from "react"
import PodcastList from "./PodcastList"
import { PodcastEpisode } from "types/interfaces/PodcastEpisode"
import { SpotifyService } from "@/services/SpotifyService"
import { PODCAST_IDs, MAX_RESULTS } from "config/constants"
import Pagination from "@/components/Pagination"
import { NumberParam, useQueryParams } from "use-query-params"

const Display = () => {
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([])
  const podcastIds: string[] = PODCAST_IDs
  const [pagination, setPagination] = useQueryParams({
    page: NumberParam,
    perPage: NumberParam,
  })

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage })
  }

  const currentPage = pagination.page || 1
  const itemsPerPage = pagination.perPage || 8

  useEffect(() => {
    console.log("Fetching podcast episodes...")

    const fetchPodcasts = async () => {
      try {
        const spotifyService = new SpotifyService()
        const allPodcastEpisodes: PodcastEpisode[] = []

        for (const podcastId of podcastIds) {
          const podcastEpisodes: PodcastEpisode[] =
            await spotifyService.fetchPodcastEpisodes(
              podcastId,
              MAX_RESULTS,
              currentPage,
              itemsPerPage
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
  }, [currentPage, itemsPerPage])

  return (
    <div>
      <PodcastList
        episodes={podcastEpisodes}
        currentPage={pagination.page || 1}
        itemsPerPage={pagination.perPage || 8}
      />
      <Pagination
        page={pagination.page || 1}
        perPage={pagination.perPage || 8}
        setPagination={setPagination}
        onPageChange={handlePageChange}
        totalItems={podcastEpisodes.length}
      />
    </div>
  )
}

export default Display
