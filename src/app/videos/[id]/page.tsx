"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { usePathname, useSearchParams } from "next/navigation"
import Image from "next/image"
import YoutubeLogo from "/public/images/logos/YouTube-White-Dark-Background-Logo.wine.svg"

import { VideoItem } from "@utils/static/fetchVideosFromYouTubers"

const VideoPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const idSegment = pathname.split("/").pop()
  const id = idSegment || searchParams.get("id") || ""

  const [video, setVideo] = useState<VideoItem | null>(null)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `https://youtube-v31.p.rapidapi.com/videos?id=${id}`,
            {
              params: {
                part: "snippet,statistics",
              },
              headers: {
                "X-RapidAPI-Key":
                  "ac41cab2aamsh587d2717936bec9p185b22jsna20c36b1f5ef",
                "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
              },
            }
          )

          if (
            response.data &&
            response.data.items &&
            response.data.items.length > 0
          ) {
            const videoData: VideoItem = response.data.items[0]
            setVideo(videoData)
          } else {
            console.error("No video data found for the provided ID:", id)
          }
        } else {
          console.warn("No video ID provided.")
        }
      } catch (error) {
        console.error("Error fetching video data:", error)
      }
    }

    fetchVideo()
  }, [id])

  if (!video) {
    return <p>Loading video data...</p>
  }
  const videoTitle = video.snippet.title
  const titleParts = videoTitle.split("|")
  const displayedTitle = titleParts.length > 1 ? titleParts[0] : videoTitle

  const publicationDate = video.snippet.publishedAt
  const formattedPublicationDate = publicationDate.split("T")[0]

  return (
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
          <Image src={YoutubeLogo} alt="youtube logo" width={106} height={40} />
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
  )
}

export default VideoPage
