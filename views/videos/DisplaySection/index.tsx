"use client"
import React, { useEffect, useState } from "react"
import VideoList from "./VideoList"
import { VideoItem } from "types/interfaces/VideoItem"
import { YoutubeService } from "@/services/YoutubeService"
import { PLAYLIST_IDs, MAX_RESULTS } from "config/constants"
import Pagination from "@/components/Pagination"
import { NumberParam, useQueryParams } from "use-query-params"
import { MAX_PER_PAGE_YOUTUBE } from "config/constants"
import SearchBar from "@views/Search&FilterSection/SearchBar/SearchBar"
import TagCloud from "@views/Search&FilterSection/TagsCloud/TagsCloud"

const Display = () => {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [pagination, setPagination] = useQueryParams({
    page: NumberParam,
    perPage: NumberParam,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYoutuber, setSelectedYoutuber] = useState<string | null>(null)
  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage })
  }

  const currentPage = pagination.page || 1
  const itemsPerPage = pagination.perPage || MAX_PER_PAGE_YOUTUBE

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const youtubeService = new YoutubeService()
        const allVideos = await youtubeService.fetchVideosFromPlaylists(
          PLAYLIST_IDs,
          MAX_RESULTS,
          currentPage,
          itemsPerPage
        )

        allVideos.sort((a, b) => {
          return (
            new Date(b.snippet.publishedAt).getTime() -
            new Date(a.snippet.publishedAt).getTime()
          )
        })
        setVideos(allVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      }
    }

    fetchVideos()
  }, [currentPage, itemsPerPage])

  const filteredVideos = videos.filter(
    (video) =>
      video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedYoutuber ||
        video.snippet.channelTitle.toLowerCase() ===
          selectedYoutuber.toLowerCase())
  )

  const handleTagClick = (youtuber: string) => {
    if (youtuber === selectedYoutuber) {
      setSelectedYoutuber(null)
    } else {
      setSelectedYoutuber(youtuber)
    }
    setPagination({ page: 1 })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPagination({ page: 1 })
  }
  const youTuberNames = Array.from(
    new Set(videos.map((video) => video.snippet.channelTitle))
  )
  return (
    <div>
      <div className="flex justify-center mx-24 mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex justify-center mx-36 mb-12">
        <TagCloud
          tags={youTuberNames}
          onTagClick={handleTagClick}
          selectedTag={selectedYoutuber}
        />
      </div>
      <VideoList
        videos={filteredVideos}
        searchQuery={searchQuery}
        currentPage={pagination.page || 1}
        itemsPerPage={pagination.perPage || MAX_PER_PAGE_YOUTUBE}
        selectedYoutuber={selectedYoutuber}
      />
      <Pagination
        page={pagination.page || 1}
        perPage={pagination.perPage || MAX_PER_PAGE_YOUTUBE}
        setPagination={setPagination}
        onPageChange={handlePageChange}
        totalItems={
          searchQuery || selectedYoutuber
            ? filteredVideos.length
            : videos.length
        }
      />
    </div>
  )
}

export default Display
