"use client"
import React, { useEffect, useState } from "react"
import PodcastList from "./PodcastList"
import { PodcastEpisode } from "types/interfaces/PodcastEpisode"
import { SpotifyService } from "@/services/SpotifyService"
import { PODCAST_IDs, MAX_RESULTS } from "config/constants"
import Pagination from "@/components/Pagination"
import { NumberParam, useQueryParams } from "use-query-params"
import { MAX_PER_PAGE_SPOTIFY } from "config/constants"
import SearchBar from "@views/Search&FilterSection/SearchBar/SearchBar"
import TagCloud from "@views/Search&FilterSection/TagsCloud/TagsCloud"

const Display = () => {
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([])
  const podcastIds: string[] = PODCAST_IDs
  const [pagination, setPagination] = useQueryParams({
    page: NumberParam,
    perPage: NumberParam,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPodcast, setSelectedPodcast] = useState<string | null>(null)
  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage })
  }

  const currentPage = pagination.page || 1
  const itemsPerPage = pagination.perPage || MAX_PER_PAGE_SPOTIFY

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

  const filteredEpisodes = podcastEpisodes.filter(
    (podcastEpisode) =>
      podcastEpisode.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedPodcast ||
        podcastEpisode.podcastName.toLowerCase() ===
          selectedPodcast.toLowerCase())
  )

  const handleTagClick = (podcast: string) => {
    if (podcast === selectedPodcast) {
      setSelectedPodcast(null)
    } else {
      setSelectedPodcast(podcast)
    }
    setPagination({ page: 1 })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPagination({ page: 1 })
  }
  const podcastNames = Array.from(
    new Set(podcastEpisodes.map((podcastEpisode) => podcastEpisode.podcastName))
  )
  return (
    <div>
      <div className="flex justify-center mx-24 mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex justify-center mx-36 mb-12">
        <TagCloud
          tags={podcastNames}
          onTagClick={handleTagClick}
          selectedTag={selectedPodcast}
        />
      </div>
      <PodcastList
        episodes={filteredEpisodes}
        searchQuery={searchQuery}
        currentPage={pagination.page || 1}
        itemsPerPage={pagination.perPage || MAX_PER_PAGE_SPOTIFY}
        selectedPodcast={selectedPodcast}
      />
      <Pagination
        page={pagination.page || 1}
        perPage={pagination.perPage || MAX_PER_PAGE_SPOTIFY}
        setPagination={setPagination}
        onPageChange={handlePageChange}
        totalItems={
          searchQuery || selectedPodcast
            ? filteredEpisodes.length
            : podcastEpisodes.length
        }
      />
    </div>
  )
}

export default Display
