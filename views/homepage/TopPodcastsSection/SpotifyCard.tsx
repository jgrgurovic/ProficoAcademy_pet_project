import React from "react"
import Image from "next/image"
import Link from "next/link"
import SpotifyLogo from "../../../public/images/logos/spotify-logo.svg"
import { SpotifyCardProps } from "types/interfaces/SpotifyCardProps"

const SpotifyCard: React.FC<SpotifyCardProps> = ({
  id,
  title,
  coverArtUrl,
}) => {
  return (
    <div
      style={{ width: "500px", height: "230px" }}
      className="rounded-lg shadow-md backdrop-blur-md bg-opacity-30 backdrop-filter bg-white bg-opacity-10 p-2 flex items-center duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      <div style={{ width: "50%", height: "100%" }} className="relative">
        <Image
          src={coverArtUrl}
          alt="cover image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div
        style={{ width: "50%", height: "100%" }}
        className="pl-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center">
            <div>
              <Link href="/podcasts/[id]" as={`/podcasts/${id}`}>
                <Image
                  src={SpotifyLogo}
                  alt="Spotify Logo"
                  width={66}
                  height={20}
                />
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-lg font-bold">{title}</h1>
          </div>
        </div>
        <div className="flex items-center">
          <Link href="/podcasts/[id]" as={`/podcasts/${id}`}>
            <button className="ml-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md">
              Play
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SpotifyCard
