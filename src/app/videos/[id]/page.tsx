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
import { splitSentences } from "@utils/static/splitSentence"
import { VideoItem } from "types/interfaces/VideoItem"
import { YoutubeService } from "@/services/YoutubeService"
import fetchLikeCount from "@utils/static/fetchLikeCountVideos"
import { toggleBookmark } from "@utils/static/bookmarkItems"
import useAuth from "@/hooks/useAuth"
import firebaseService from "@/services/FirebaseService"
import interactionService from "@/services/InteractionService"
import { InteractionType } from "@utils/enums/interactionTypes"
import { ContentType } from "@utils/enums/contentTypes"
import { compute } from "@utils/static/compute"
import Comments from "@views/Cooments/Comments"

const VideoPage = () => {
  const { user } = useAuth()
  const pathname = usePathname()
  const idSegment = pathname.split("/").pop()
  const id = idSegment || ""
  const userId = user?.id

  const [video, setVideo] = useState<VideoItem | null>(null)
  const youtubeService = new YoutubeService()
  const [likeCount, setLikeCount] = useState<number>(0)
  const [likeStatus, setLikeStatus] = useState<{ [key: string]: boolean }>({})
  const [dislikeCount, setDislikeCount] = useState<number>(0)
  const [dislikeStatus, setDislikeStatus] = useState<{
    [key: string]: boolean
  }>({})
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isDescriptionVisible, setDescriptionVisible] = useState(false)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (id) {
          const videoData = await youtubeService.fetchVideo(id)
          setVideo(videoData)
          setLikeStatus(videoData.likeStatus || {})
          setDislikeStatus(videoData.dislikeStatus || {})

          const fetchedLikeCount = await fetchLikeCount(
            id,
            InteractionType.Like
          )
          const fetchedDislikeCount = await fetchLikeCount(
            id,
            InteractionType.Dislike
          )

          const { likeStatus, dislikeStatus } =
            await firebaseService.getLikesAndDislikesVideo(id)
          if (userId !== undefined) {
            const isBookmarkedFromFirebase = await firebaseService.getBookmarks(
              userId,
              id
            )
            setIsBookmarked(isBookmarkedFromFirebase)
          }
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
        ContentType.Video
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
        ContentType.Video
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
      await toggleBookmark(userId, id, video, ContentType.Video)
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    }
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
        <Comments contentId={id} contentType={ContentType.Video} />
      </div>
    </>
  )
}

export default VideoPage
