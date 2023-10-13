"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import YoutubeLogo from "/public/images/logos/YouTube-White-Dark-Background-Logo.wine.svg"
import { formatDate, DateFormats } from "@utils/static/formatDate"
import { splitSentences } from "@utils/static/splitSentence"
import { VideoItem } from "types/interfaces/VideoItem"
import { YoutubeService } from "@/services/YoutubeService"
import { compute } from "@utils/static/compute"

const VideoPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const idSegment = pathname.split("/").pop()
  const id = idSegment || searchParams.get("id") || ""

  const [video, setVideo] = useState<VideoItem | null>(null)
  const youtubeService = new YoutubeService()
  const [isDescriptionVisible, setDescriptionVisible] = useState(false)

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

  const match = video?.contentDetails.duration.match(/PT(\d+)M(\d+)S/)

  const { minutes, seconds } = compute(() => {
    if (match) {
      return {
        minutes: parseInt(match[1]),
        seconds: parseInt(match[2]),
      }
    } else {
      return { minutes: 0, seconds: 0 }
    }
  })

  if (!video) {
    return <p>Loading episode data...</p>
  }

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible)
  }

  const { channelTitle, description } = video.snippet

  return (
    <>
      <div
        className="group rounded-xl shadow-md flex flex-row overflow-hidden justify-center m-20"
        style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
        <div className="relative rounded-xl flex-grow w-2/3">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=0&controls=1`}
            width="100%"
            height="100%"
            className="rounded-xl"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="px-4 w-1/2 flex-shrink ">
          <h1 className="text-2xl font-semibold text-white mb-2 py-2">
            {displayedTitle}
          </h1>
          <Link
            href={`https://www.youtube.com/${channelTitle}`}
            target="_blank">
            <span className="bg-mainRed text-white rounded-full px-3 py-1 text-md font-semibold mr-2 mt-4">
              {channelTitle}
            </span>
          </Link>
          <div className="flex-grow mt-4 mt-4">
            <p className="text-gray-300 my-2">
              Duration: {minutes} min {seconds} s
            </p>
            <p className="text-gray-300 mb-4">
              Published At: {formattedPublicationDate}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-md mt-2">
          <button
            onClick={toggleDescription}
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-full px-6 py-2 inline-block mx-24">
            DESCRIPTION
          </button>
        </h2>
        {isDescriptionVisible && (
          <div className="leading-normal mx-24 max-w-full bg-black/20 p-3 rounded-2xl">
            {splitSentences(description).map((sentence) => (
              <p
                key={sentence}
                className="text-gray-100 text-l mb-3 whitespace-normal break-words">
                {sentence}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default VideoPage
