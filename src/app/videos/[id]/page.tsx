"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"
import YoutubeLogo from "/public/images/logos/YouTube-White-Dark-Background-Logo.wine.svg"
import { formatDate, DateFormats } from "@utils/static/formatDate"
import { VideoItem } from "types/interfaces/interface"
import { YoutubeService } from "@/services/YoutubeService"

const VideoPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const idSegment = pathname.split("/").pop()
  const id = idSegment || searchParams.get("id") || ""

  const [video, setVideo] = useState<VideoItem | null>(null)
  const youtubeService = new YoutubeService()

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (id) {
          const videoData = await youtubeService.fetchVideo(id)
          setVideo(videoData)
        } else {
          console.warn("No video ID provided.")
        }
      } catch (error) {
        console.error("Error fetching video data:", error)
      }
    }

    fetchVideo()
  }, [id])

  const videoTitle = video?.snippet?.title || ""
  const titleParts = videoTitle.split("|")
  const displayedTitle = titleParts.length > 1 ? titleParts[0] : videoTitle

  const formattedPublicationDate = video?.snippet?.publishedAt
    ? formatDate(video.snippet.publishedAt, DateFormats.fullNumericalDate)
    : ""

  if (!video) {
    return <p>Loading episode data...</p>
  }

  return (
    <>
      <div className="group rounded-xl shadow-md flex flex-row overflow-hidden justify-center my-20">
        <div className="relative w-1/3">
          <Image
            src={video.snippet.thumbnails.standard.url}
            alt={video.snippet.title}
            layout="responsive"
            width={284}
            height={158}
            objectFit="cover"
            objectPosition="center top"
            className="rounded-t-xl "
          />
        </div>
        <div className="px-4 w-1/2">
          <div>
            <Image
              src={YoutubeLogo}
              alt="youtube logo"
              width={106}
              height={40}
            />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">
            {displayedTitle}
          </h1>
          <span className="bg-mainRed text-white rounded-full px-3 py-1 text-md font-semibold mr-2">
            {video.snippet.channelTitle}
          </span>
          <div className="flex-grow mt-4">
            <p className="text-gray-300 mb-4">
              Published At: {formattedPublicationDate}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoPage
