import React from "react"
import HeroPages from "@views/HeroSection"
import { SearchFilter } from "@views/Search&FilterSection"
import Display from "@views/podcasts/DisplaySection"

const Videos = () => {
  return (
    <div>
      <HeroPages />
      <SearchFilter />
      <Display />
    </div>
  )
}

export default Videos
