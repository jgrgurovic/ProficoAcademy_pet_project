import Image from "next/image"
import Link from "next/link"
import YoutubeLogo from "/public/images/logos/YouTube-White-Dark-Background-Logo.wine.svg"
import YoutubePlay from "public/images/logos/youtube-color-svgrepo-com.svg"
import { YoutubeCardProps } from "types/interfaces/YoutubeCardProps"

const YoutubeCard: React.FC<YoutubeCardProps> = ({
  title,
  channelTitle,
  videoId,
  thumbnailUrl,
}) => {
  return (
    <div
      className="max-w-sm mx-auto "
      style={{ height: "580px", width: "400px" }}>
      <div className="card text-white backdrop-blur-md bg-opacity-30 backdrop-filter bg-white bg-opacity-10 duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
        <div className="relative group">
          <Image
            className="card-img-top"
            src={thumbnailUrl}
            alt="Card image cap"
            width={500}
            height={500}
          />
          <Link href="/videos/[videoId]" as={`/videos/${videoId}`}>
            <Image
              src={YoutubePlay}
              alt="play button"
              width={200}
              height={200}
              className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white fill-current animate-pulse"
            />
          </Link>
        </div>
        <div>
          <Image src={YoutubeLogo} alt="youtube logo" width={86} height={20} />
        </div>
        <h1
          className="card-header text-lg font-bold"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}>
          {title}
        </h1>
        <div className="card-body">
          <h5
            className="card-title text-sm font-light"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}>
            {channelTitle}
          </h5>
        </div>
      </div>
    </div>
  )
}

export default YoutubeCard
