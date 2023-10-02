"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import SpotifyLogo from "/public/images/logos/spotify-logo.svg"
import {
  formatDate,
  formatMillisecondsToMinutesAndSeconds,
  DateFormats,
} from "@utils/static/formatDate"
import { PodcastEpisode } from "types/interfaces/interface"
import { SpotifyService } from "@/services/SpotifyService"

const EpisodePage = () => {
  const pathname = usePathname()
  const idSegment = pathname.split("/").pop()
  const id = idSegment || ""

  const [episode, setEpisode] = useState<PodcastEpisode | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const spotifyService = new SpotifyService()
        try {
          const episodeData = await spotifyService.fetchEpisode(id)
          setEpisode(episodeData)
        } catch (error) {
          console.error("Error fetching episode data:", error)
        }
      }
    }

    fetchData()
  }, [id])

  const formattedPublicationDate = episode?.releaseDate
    ? formatDate(episode.releaseDate.isoString, DateFormats.fullNumericalDate)
    : ""
  const { minutes, seconds } = episode?.duration
    ? formatMillisecondsToMinutesAndSeconds(episode.duration.totalMilliseconds)
    : { minutes: 0, seconds: 0 }

  if (!episode) {
    return <p>Loading episode data...</p>
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
          <div>
            <Image
              src={SpotifyLogo}
              alt="Spotify Logo"
              width={106}
              height={40}
            />
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
