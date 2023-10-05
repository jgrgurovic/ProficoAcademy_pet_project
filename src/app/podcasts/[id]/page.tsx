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
import { splitSentences } from "@utils/static/splitSentence"
import { PodcastEpisode } from "types/interfaces/PodcastEpisode"
import { SpotifyService } from "@/services/SpotifyService"

const EpisodePage = () => {
  const pathname = usePathname()
  const idSegment = pathname.split("/").pop()
  const id = idSegment || ""

  const [episode, setEpisode] = useState<PodcastEpisode | null>(null)
  const [isDescriptionVisible, setDescriptionVisible] = useState(false)

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

  const spotifyURI = episode.podcastV2.data.uri
  const parts = spotifyURI.split(":")
  const podcastID = parts[2]

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible)
  }

  const { name, coverArt, description, podcastV2 } = episode
  const { sources } = coverArt
  const { data } = podcastV2

  return (
    <>
      <div className="group rounded-xl flex flex-row overflow-hidden justify-center my-20 ">
        <div className="relative w-1/3">
          <Image
            src={sources[2].url}
            alt={name}
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
          <h1 className="text-3xl font-semibold my-2">{name}</h1>
          <a
            href={`https://open.spotify.com/show/${podcastID}`}
            target="_blank">
            <span className="bg-green-500 text-white text-md mt-2 font-semibold rounded-full px-6 py-2 inline-block">
              {data.name}
            </span>
          </a>
          <p className="text-gray-300 my-2">
            Duration: {minutes} min {seconds} s
          </p>
          <p className="text-gray-300 my-2">
            Publication Date: {formattedPublicationDate}
          </p>
          <div className="my-8">
            <iframe
              className="w-full"
              height="80"
              allowTransparency={true}
              allow="encrypted-media"
              src={`https://open.spotify.com/embed/episode/${id}?theme=white?utm_source=oembed`}></iframe>
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
            {splitSentences(description).map((sentence, index) => (
              <p
                key={index}
                className="text-gray-100 text-xl mb-3 whitespace-normal break-words">
                {sentence}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default EpisodePage
