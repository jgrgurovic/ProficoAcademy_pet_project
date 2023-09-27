import React from "react"
import Image from "next/image"
import Link from "next/link"
import SpotifyLogo from "../../../public/images/logos/spotify-logo.svg"
import { PodcastEpisode } from "../../../utils/static/fetchPodcastsFromSpotify"

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode
}

const PodcastEpisodeCard: React.FC<PodcastEpisodeCardProps> = ({ episode }) => (
  <div className="w-full h-40 flex items-center rounded-lg shadow-md  bg-opacity-30  bg-white/10  p-2 hover:scale-110 hover:shadow-2xl transition-transform duration-200 ">
    <div className="w-1/3 h-full relative">
      <Image
        src={episode.coverArtUrl}
        alt="cover image"
        layout="fill"
        objectFit="cover"
        className="w-full h-full rounded-lg"
      />
    </div>
    <div className="w-2/3 ml-4">
      <div className="flex items-center">
        <div>
          <Image src={SpotifyLogo} alt="Spotify Logo" width={66} height={20} />
        </div>
      </div>
      <div className="mt-2">
        <h1 className="text-sm truncate">{episode.title}</h1>
        <p className="text-sm font-light">{episode.podcastName}</p>
      </div>
      <Link href={`/podcasts/${episode.id}`}>
        <button className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md my-2 hover:bg-green-600 hover:scale-110">
          Play
        </button>
      </Link>
      <p className="text-xs text-gray-300 mt-2 max-w-full self-end">
        Publication Date: {episode.publicationDate}
      </p>
    </div>
  </div>
)

export default PodcastEpisodeCard
