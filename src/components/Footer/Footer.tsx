import Image from "next/image"
import { FaEnvelope } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="text-white text-s mt-8 ">
      <div className="flex flex-col md:flex-row p-2 md:p-8">
        <div className="mx-6 md:mx-12 mb-4 md:mb-0">
          <p className="text-center md:text-left">
            Welcome, where our mission is to shed{" "}
            <span className="text-yellow-400 font-bold">light</span> on the
            mysteries that lie in the shadows.
          </p>
        </div>
        <div className="mx-6 md:mx-12 mb-4 md:mb-0">
          <p className="text-center md:text-left underline">Contact Us</p>
          <div className="flex items-center">
            <ul>
              <li className="text-center md:text-left flex items-center hover:scale-105 transition duration-300 ease-in-out">
                <FaEnvelope className="mr-2" />
                <a href="mailto:contact@yourtruecrimewebapp.com">
                  contact@yourtruecrimewebapp.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 md:px-12 flex justify-center md:justify-start space-x-2 md:space-x-4">
          <a href="https://www.youtube.com/" target="_blank">
            <Image
              src="/images/logos/youtube_logo.svg"
              alt="youtube logo"
              width={50}
              height={50}
              className="hover:scale-105"
            />
          </a>
          <a href="https://open.spotify.com/" target="_blank">
            <Image
              src="/images/logos/spotify_logo.svg"
              alt="spotify logo"
              width={50}
              height={50}
              className="hover:scale-105"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
