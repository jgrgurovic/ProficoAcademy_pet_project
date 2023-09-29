"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Image from "next/image"
import SpotifyLogo from "/public/images/logos/spotify-logo.svg"

import { PodcastEpisode } from "@utils/static/fetchPodcastsFromSpotify"

const EpisodePage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const idSegment = pathname.split("/").pop()
  const id = idSegment || searchParams.get("id") || ""

  const [episode, setEpisode] = useState<PodcastEpisode | null>(null)

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `https://spotify23.p.rapidapi.com/episode/?id=${id}`,
            {
              headers: {
                "X-RapidAPI-Key":
                  "ac41cab2aamsh587d2717936bec9p185b22jsna20c36b1f5ef",
                "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
              },
            }
          )
          console.log("Condition:", response.data.data.episodeUnionV2)
          if (response.data?.data?.episodeUnionV2) {
            const episodeData: PodcastEpisode =
              response.data.data.episodeUnionV2
            setEpisode(episodeData)
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
    fetchEpisode()
  }, [id])
  if (!episode) {
    return <p>Loading episode data...</p>
  }
  const totalMilliseconds = episode.duration.totalMilliseconds
  const minutes = Math.floor(totalMilliseconds / 60000)
  const seconds = ((totalMilliseconds % 60000) / 1000).toFixed(0)

  const publicationDate = episode.releaseDate.isoString
  const formattedPublicationDate = publicationDate.split("T")[0]

  return (
    <div>
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
      <div className="mx-24">
        <p className="text-gray-200 text-l mb-4">{episode.description}</p>
      </div>
    </div>
  )
}

export default EpisodePage
