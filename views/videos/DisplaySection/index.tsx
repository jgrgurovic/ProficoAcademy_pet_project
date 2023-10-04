"use client"
import React, { useEffect, useState } from "react"
import VideoList from "./VideoList"
import { VideoItem } from "types/interfaces/VideoItem"
import { YoutubeService } from "@/services/YoutubeService"
import { PLAYLIST_IDs, MAX_RESULTS } from "config/constants"
import Pagination from "@/components/Pagination"
import { NumberParam, useQueryParams } from "use-query-params"

const Display = () => {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [pagination, setPagination] = useQueryParams({
    page: NumberParam,
    perPage: NumberParam,
  })

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage })
  }

  const currentPage = pagination.page || 1
  const itemsPerPage = pagination.perPage || 9

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

  return (
    <div>
      <VideoList
        videos={videos}
        currentPage={pagination.page || 1}
        itemsPerPage={pagination.perPage || 9}
      />
      <Pagination
        page={pagination.page || 1}
        perPage={pagination.perPage || 9}
        setPagination={setPagination}
        onPageChange={handlePageChange}
        totalItems={videos.length}
      />
    </div>
  )
}

export default Display
