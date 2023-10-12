"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  FaThumbsUp,
  FaThumbsDown,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa"
import { showToast } from "@/components/toastMessage"
import YoutubeLogo from "/public/images/logos/YouTube-White-Dark-Background-Logo.wine.svg"
import { formatDate, DateFormats } from "@utils/static/formatDate"
import { VideoItem } from "types/interfaces/VideoItem"
import { YoutubeService } from "@/services/YoutubeService"
import fetchLikeCount from "@utils/static/fetchLikeCountVideos"
import { toggleBookmark } from "@utils/static/bookmarkItems"
import useAuth from "@/hooks/useAuth"
import firebaseService from "@/services/FirebaseService"
import interactionService from "@/services/InteractionService"

const VideoPage = () => {
  const { user } = useAuth()
  const pathname = usePathname()
  const idSegment = pathname.split("/").pop()
  const id = idSegment || ""

  const [video, setVideo] = useState<VideoItem | null>(null)
  const youtubeService = new YoutubeService()
  const [likeCount, setLikeCount] = useState<number>(0)
  const [likeStatus, setLikeStatus] = useState<{ [key: string]: boolean }>({})
  const [dislikeCount, setDislikeCount] = useState<number>(0)
  const [dislikeStatus, setDislikeStatus] = useState<{
    [key: string]: boolean
  }>({})
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (id) {
          const videoData = await youtubeService.fetchVideo(id)
          setVideo(videoData)
          setLikeStatus(videoData.likeStatus || {})
          setDislikeStatus(videoData.dislikeStatus || {})

          const fetchedLikeCount = await fetchLikeCount(id, "like")
          const fetchedDislikeCount = await fetchLikeCount(id, "dislike")

          const { likeStatus, dislikeStatus } =
            await firebaseService.getLikesAndDislikesVideo(id)
          const isBookmarkedFromFirebase = await firebaseService.getBookmarks(
            user?.id,
            id
          )
          setIsBookmarked(isBookmarkedFromFirebase)
          setLikeCount(fetchedLikeCount)
          setDislikeCount(fetchedDislikeCount)
          setLikeStatus(likeStatus)
          setDislikeStatus(dislikeStatus)
        } else {
          console.warn("No video ID provided.")
        }
      } catch (error) {
        console.error("Error fetching video data:", error)
      }
    }

    fetchVideo()
  }, [id, user])

  const videoTitle = video?.snippet?.title || ""
  const titleParts = videoTitle.split("|")
  const displayedTitle = titleParts.length > 1 ? titleParts[0] : videoTitle

  const formattedPublicationDate = video?.snippet?.publishedAt
    ? formatDate(video.snippet.publishedAt, DateFormats.fullNumericalDate)
    : ""

  if (!video) {
    return <p>Loading episode data...</p>
  }

  const handleThumbsUpClick = async () => {
    if (!user) {
      showToast(
        <>
          Please{" "}
          <Link href="/login" className="underline">
            log in
          </Link>{" "}
          to like the video.
        </>
      )
      return
    }
    const userId = user.id
    const videoId = id

    try {
      await interactionService.handleThumbsUp(
        userId,
        videoId,
        likeStatus,
        dislikeStatus,
        setLikeCount,
        setDislikeCount,
        setLikeStatus,
        setDislikeStatus,
        likeCount,
        dislikeCount,
        "video"
      )
    } catch (error) {
      console.error("Error in clicking like:", error)
    }
  }

  const handleThumbsDownClick = async () => {
    if (!user) {
      showToast(
        <>
          Please{" "}
          <Link href="/login" className="underline">
            log in
          </Link>{" "}
          to dislike the video.
        </>
      )
      return
    }
    const userId = user.id
    const videoId = id

    try {
      await interactionService.handleThumbsDown(
        userId,
        videoId,
        likeStatus,
        dislikeStatus,
        setLikeCount,
        setDislikeCount,
        setLikeStatus,
        setDislikeStatus,
        likeCount,
        dislikeCount,
        "video"
      )
    } catch (error) {
      console.error("Error in clicking dislike:", error)
    }
  }

  const handleBookmarkClick = async () => {
    if (!user) {
      showToast(
        <>
          Please{" "}
          <Link href="/login" className="underline">
            log in
          </Link>{" "}
          to bookmark the video.
        </>
      )
      return
    }
    const userId = user.id
    if (!userId || !id) {
      console.error("User bookmarkID is missing")
      return
    }
    try {
      await toggleBookmark(userId, id, video)
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    }
  }
  return (
    <>
      <div className="group rounded-xl flex flex-row overflow-hidden justify-center my-20">
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
        <div className="px-4 w-1/2 bg-white/10 rounded-xl ml-2 p-2">
          <div className="inline-flex w-full">
            <div>
              <Image
                src={YoutubeLogo}
                alt="Spotify Logo"
                width={106}
                height={40}
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex-end cursor-pointer">
              {isBookmarked ? (
                <FaBookmark
                  size={24}
                  className="hover:animate-pulse text-white"
                  onClick={handleBookmarkClick}
                />
              ) : (
                <FaRegBookmark
                  size={24}
                  className="hover:animate-pulse"
                  onClick={handleBookmarkClick}
                />
              )}
            </div>
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
          <div className=" inline-flex">
            <div
              className="pr-6 pl-3 py-1 bg-white/10 rounded-2xl inline-flex justify-center items-center hover:bg-white/20 cursor-pointer"
              onClick={handleThumbsUpClick}>
              <FaThumbsUp size={24} className="hover:animate-pulse" />
              <p className="text-white text-l ml-3 "> {likeCount}</p>
            </div>
            <div
              className="pr-3 pl-3 py-1 ml-2 bg-white/10 rounded-2xl inline-flex justify-center items-center hover:bg-white/20"
              style={{ cursor: "pointer" }}
              onClick={handleThumbsDownClick}>
              <FaThumbsDown size={24} className="hover:animate-pulse" />
              <p className="text-white text-l ml-3 "> {dislikeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoPage
