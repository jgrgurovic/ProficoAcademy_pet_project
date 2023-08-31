import Image from "next/image";

const Footer = () => {
  return (
    <footer className="text-white text-s mt-8 ">
      <div className="flex flex-col md:flex-row p-4 md:p-8">
        <div className="mx-4 md:mx-12 mb-4 md:mb-0">
          <p className="text-center md:text-left">
            Welcome, where our mission is to shed light on the mysteries that lie in the shadows.
          </p>
        </div>
        <div className="mx-4 md:mx-12 mb-4 md:mb-0">
          <p className="text-center md:text-left">Contact Information:</p>
          <ul>
            <li className="text-center md:text-left"><span className="list-bullet">Email:</span> contact@yourtruecrimewebapp.com</li>
          </ul>
        </div>
        <div className="px-4 md:px-12 flex justify-center md:justify-start">
          <Image src="/youtube_logo.png" alt="youtube logo" width={50} height={50} />
          <Image src="/spotify_logo.png" alt="spotify logo" width={50} height={50} />
          <Image src="/itunes_logo.png" alt="itunes logo" width={50} height={50} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;