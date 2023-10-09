"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import Image from "next/image"
import {
  FaThumbsUp,
  FaThumbsDown,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa"
import SpotifyLogo from "/public/images/logos/spotify-logo.svg"
import {
  formatDate,
  formatMillisecondsToMinutesAndSeconds,
  DateFormats,
} from "@utils/static/formatDate"
import { PodcastEpisode } from "types/interfaces/PodcastEpisode"
import { SpotifyService } from "@/services/SpotifyService"
import { likeEpisode } from "@utils/static/likePodcasts"
import { ref, getDatabase, get } from "firebase/database"
import firebaseApp from "@config/firebase"
import fetchLikeCount from "@utils/static/fetchLikeCountPodcasts"
import { toggleBookmark } from "@utils/static/bookmarkItems"

const db = getDatabase(firebaseApp)

const EpisodePage = () => {
  const { user,loading } = useAuth()
  const pathname = usePathname()
  const idSegment = pathname.split("/").pop()
  const id = idSegment || ""

  const [episode, setEpisode] = useState<PodcastEpisode | null>(null)
  const [likeCount, setLikeCount] = useState<number>(0)
  const [likeStatus, setLikeStatus] = useState<{ [key: string]: boolean }>({})
  const [dislikeCount, setDislikeCount] = useState<number>(0)
  const [dislikeStatus, setDislikeStatus] = useState<{
    [key: string]: boolean
  }>({})
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const spotifyService = new SpotifyService()
        try {
          const episodeData = await spotifyService.fetchEpisode(id)
          setEpisode(episodeData)

          setLikeStatus(episodeData.likeStatus || {})
          setDislikeStatus(episodeData.dislikeStatus || {})

          const fetchedLikeCount = await fetchLikeCount(id, "like")
          const fetchedDislikeCount = await fetchLikeCount(id, "dislike")

          const likesRef = ref(db, `data/podcasts/interactions/likes/${id}`)
          const likeStatusSnapshot = await get(likesRef)
          const likeStatus = likeStatusSnapshot.val() || {}

          const dislikesRef = ref(
            db,
            `data/podcasts/interactions/dislikes/${id}`
          )
          const dislikeStatusSnapshot = await get(dislikesRef)
          const dislikeStatus = dislikeStatusSnapshot.val() || {}

          const bookmarkRef = ref(db, `data/users/${user?.id}/bookmarks/${id}`)
          const bookmarkStatusSnapshot = await get(bookmarkRef)
          const isBookmarkedFromFirebase = bookmarkStatusSnapshot.exists()

          setIsBookmarked(isBookmarkedFromFirebase)
          setLikeCount(fetchedLikeCount)
          setDislikeCount(fetchedDislikeCount)
          setLikeStatus(likeStatus)
          setDislikeStatus(dislikeStatus)
        } catch (error) {
          console.error("Error fetching episode data:", error)
        }
      }
    }

    fetchData()
  }, [id,user])

  const formattedPublicationDate = episode?.releaseDate
    ? formatDate(episode.releaseDate.isoString, DateFormats.fullNumericalDate)
    : ""
  const { minutes, seconds } = episode?.duration
    ? formatMillisecondsToMinutesAndSeconds(episode.duration.totalMilliseconds)
    : { minutes: 0, seconds: 0 }

  if (!episode) {
    return <p>Loading episode data...</p>
  }

  if (!user || loading) {
    return <p>User is not logged in</p>
  }

  const handleThumbsUpClick = async () => {
    const userId = user.id
    const episodeId = id

    const currentLikeStatus = likeStatus[userId]
    const currentDislikeStatus = dislikeStatus[userId]

    const updatedLikeStatus = { ...likeStatus }
    const updatedDislikeStatus = { ...dislikeStatus }

    if (!currentLikeStatus) {
      updatedLikeStatus[userId] = true
      setLikeCount(likeCount + 1)

      if (currentDislikeStatus) {
        updatedDislikeStatus[userId] = false
        setDislikeCount(dislikeCount - 1)
      }
    } else {
      updatedLikeStatus[userId] = false
      setLikeCount(likeCount - 1)
    }

    setLikeStatus(updatedLikeStatus)
    setDislikeStatus(updatedDislikeStatus)

    try {
      await likeEpisode(episodeId, userId, "like", likeCount, dislikeCount)
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const handleThumbsDownClick = async () => {
    const userId = user.id
    const episodeId = id

    const updatedLikeStatus = { ...likeStatus }
    const updatedDislikeStatus = { ...dislikeStatus }

    if (!updatedDislikeStatus[userId]) {
      updatedDislikeStatus[userId] = true
      setDislikeCount(dislikeCount + 1)

      if (updatedLikeStatus[userId]) {
        updatedLikeStatus[userId] = false
        setLikeCount(likeCount - 1)
      }
    } else {
      updatedDislikeStatus[userId] = false
      setDislikeCount(dislikeCount - 1)
    }

    setLikeStatus(updatedLikeStatus)
    setDislikeStatus(updatedDislikeStatus)

    try {
      await likeEpisode(episodeId, userId, "dislike", likeCount, dislikeCount)
    } catch (error) {
      console.error("Error toggling dislike:", error)
    }
  }

  const handleBookmarkClick = async () => {
    const userId = user.id
    if (!userId || !id) {
      console.error("User or podcastID is missing")
      return
    }
    try {
      await toggleBookmark(userId, id)
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    }
  }

  return (
    <>
      <div className="group rounded-xl flex flex-row overflow-hidden justify-center my-20 ">
        <div className="relative w-1/3">
          <Image
            src={episode.coverArt.sources[2].url}
            alt={episode.name}
            layout="responsive"
            width={284}
            height={158}
            objectFit="cover"
            objectPosition="center top"
            className="rounded-xl"
          />
        </div>
        <div className="px-4 w-1/2 bg-white/10 rounded-xl ml-2 p-2">
          <div className="inline-flex w-full">
            <div>
              <Image
                src={SpotifyLogo}
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
          <h1 className="text-3xl font-semibold my-2">{episode.name}</h1>
          <h2 className="text-md mt-2">
            <span className="bg-green-500 text-white font-semibold rounded-full px-6 py-2 inline-block">
              {episode.podcastV2.data.name}
            </span>
          </h2>
          <p className="text-gray-300 my-2">
            Duration: {minutes} min {seconds} s
          </p>
          <p className="text-gray-300 my-2">
            Publication Date: {formattedPublicationDate}
          </p>
          <div className="my-8">
            <audio controls>
              <source src={episode.audio.items[0].url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
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
      <div className="mx-24 max-w-full ">
        <p className="text-gray-200 text-l mb-4 whitespace-normal break-words">
          {episode.description}
        </p>
      </div>
    </>
  )
}

export default EpisodePage
