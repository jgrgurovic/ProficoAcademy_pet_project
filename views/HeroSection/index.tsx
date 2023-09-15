"use client"
import React from "react"
import Image from "next/image"
import HeroImage from "../../public/hero_streetimage.png"
import { usePathname } from "next/navigation"

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
const HeroPages = () => {
  const pathname = usePathname()
  const pathParts = pathname.split("/")
  const lastPart = pathParts[pathParts.length - 1]
  const heroHeading = capitalizeFirstLetter(lastPart)
  return (
    <div className="relative">
      <div className="flex justify-center items-center w-full h-[450px] ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="font-courier-prime text-white text-5xl font-bold tracking-[9.6px]">
            {heroHeading}
          </h1>
        </div>
        <div className="w-full h-[450px] bg-cover bg-center absolute top-0 left-0 z-[-1] mix-blend-difference ">
          <Image
            src={HeroImage}
            alt="Hero Street Image"
            layout="fill"
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}

export default HeroPages
