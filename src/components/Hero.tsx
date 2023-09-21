import Image from "next/image"
import HeroImage from "../../public/images/hero_streetimage.png"
const Hero = () => {
  return (
    <div className="relative">
      <div className="xl:flex-1.5 flex justify-center items-center w-full h-screen relative bg-difference">
        <div className="absolute inset-0 flex flex-col items-start justify-center pl-8 ">
          <h1 className="heroTitle pt-48 px-4 text-white text-5xl tracking-wide leading-loose">
            Unveil the Shadows:
            <br />
            Explore the Untold Stories of
            <br />
            <span className="text-mainRed font-extrabold  leading-loose">
              True crime
            </span>
          </h1>
        </div>
        <div className="w-[100%] h-[590px] xl:w-full xl:h-full bg-cover bg-center absolute top-0 left-0 z-[-1] mix-blend-difference">
          <Image
            src={HeroImage}
            alt="Hero Street Image"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
