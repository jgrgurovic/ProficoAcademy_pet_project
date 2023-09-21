import React from "react"
import Image from "next/image"
import SpotifyLogo from "../../../public/images/logos/spotify-logo.svg"
const SpotifyCard = () => {
  return (
    <div className="w-100 h-40 flex justify-center items-center rounded-lg shadow-md backdrop-blur-md bg-opacity-30 backdrop-filter bg-white bg-opacity-10 p-2 ">
      <div className="ml-auto relative w-full h-full  ">
        <Image
          src="/images/bella_fiori_mm.jpg"
          alt="cover image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full rounded-lg"
        />
      </div>
      <div>
        <div className="pl-2">
          <div className="flex items-center">
            <div>
              <Image
                src={SpotifyLogo}
                alt="Spotify Logo"
                width={66}
                height={20}
              />
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-lg font-bold">episode title</h1>
            <p className="text-sm font-light">podcast name</p>
          </div>
          <div className="mt-2 flex items-center">
            <div className="w-16 h-1 bg-gray-300 rounded-sm"></div>
            <div className="ml-2">00:00</div>
            <button className="ml-2 bg-green-500 text-white px-2 py-1 rounded-md">
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpotifyCard
