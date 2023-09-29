import React from "react"
import { SearchFilter } from "@views/Search&FilterSection"
import HeroPages from "@views/HeroSection"
import Display from "@views/podcasts/DisplaySection"

const Podcasts = () => {
  return (
    <div>
      <HeroPages />
      <SearchFilter />
      <Display />
    </div>
  )
}

export default Podcasts
