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
          <p className="text-center md:text-left">Contact Us</p>
          <div className="flex items-center">
            <ul>
              <li className="text-center md:text-left flex items-center hover:scale-110">
                <FaEnvelope className="mr-2" />
                <a href="mailto:contact@yourtruecrimewebapp.com">
                  contact@yourtruecrimewebapp.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 md:px-12 flex justify-center md:justify-start space-x-2 md:space-x-4">
          <Image
            src="/images/logos/youtube_logo.svg"
            alt="youtube logo"
            width={40}
            height={40}
          />
          <Image
            src="/images/logos/spotify_logo.svg"
            alt="spotify logo"
            width={40}
            height={40}
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
