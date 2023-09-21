import Image from "next/image"
import YoutubeLogo from "/public/images/logos/YouTube-White-Dark-Background-Logo.wine.svg"
import YoutubePlay from "public/images/logos/youtube-color-svgrepo-com.svg"
const YoutubeCard = () => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="card text-white backdrop-blur-md bg-opacity-30 backdrop-filter bg-white bg-opacity-10 ">
        <div className="relative group">
          <Image
            className="card-img-top"
            src="/images/bella_fiori_mm.jpg"
            alt="Card image cap"
            width={400}
            height={400}
          />
          <Image
            src={YoutubePlay}
            alt="play button"
            width={200}
            height={200}
            className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white fill-current"
          />
        </div>
        <div>
          <Image src={YoutubeLogo} alt="youtube logo" width={86} height={20} />
        </div>
        <h1 className="card-header text-lg font-bold">Video title</h1>
        <div className="card-body">
          <h5 className="card-title text-sm font-light">Channel</h5>
        </div>
      </div>
    </div>
  )
}

export default YoutubeCard
