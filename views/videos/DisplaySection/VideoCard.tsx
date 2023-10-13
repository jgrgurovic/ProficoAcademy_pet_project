import React from "react"
import { VideoItem } from "types/interfaces/VideoItem"
import Link from "next/link"
import Image from "next/image"
import PlayButton from "@public/images/logos/youtube-color-svgrepo-com.svg"
import YoutubeLogo from "@public/images/logos/YouTube-White-Dark-Background-Logo.wine.svg"
import { formatDate, DateFormats } from "@utils/static/formatDate"

interface VideoCardProps {
  video: VideoItem
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoTitle = video.snippet.title
  const titleParts = videoTitle.split("|")
  const displayedTitle = titleParts.length > 1 ? titleParts[0] : videoTitle
  const formattedDate = formatDate(
    video.snippet.publishedAt,
    DateFormats.fullNumericalDate
  )

  const { resourceId, thumbnails, title, channelTitle } = video.snippet
  const { videoId } = resourceId
  const { high } = thumbnails
  const { url } = high

  return (
    <div className="group rounded-xl bg-white/10  shadow-md hover:scale-110 hover:shadow-2xl transition-transform duration-200 flex flex-col ">
      <div className="relative group ">
        <Image
          src={url}
          alt={title}
          layout="responsive"
          width={284}
          height={158}
          objectFit="cover"
          objectPosition="center top"
          className="rounded-t-xl "
        />
        <Link href="/videos/[videoId]" as={`/videos/${videoId}`}>
          <Image
            src={PlayButton}
            alt="play button"
            width={284}
            height={158}
            className="hidden group-hover:block animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white fill-current"
          />
        </Link>
      </div>
      <div>
        <Image src={YoutubeLogo} alt="youtube logo" width={86} height={20} />
      </div>
      <div className="p-2 flex flex-col flex-grow gap-y-2">
        <h2 className="text-base text-white">{displayedTitle}</h2>
        <h3 className="text-md font-bold text-mainRed mt-auto">
          {channelTitle}
        </h3>
        <p className="text-sm text-gray-300 mt-2 max-w-full">
          Publication Date: {formattedDate}
        </p>
      </div>
    </div>
  )
}

export default VideoCard
