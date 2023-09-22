import React from "react"
import Image from "next/image"
import FilterMenu from "./FilterMenu"
import SearchBar from "./SearchBar"

export const SearchFilter = () => {
  return (
    <div className="flex justify-center mx-24 mb-24">
      <SearchBar />
      <FilterMenu />
    </div>
  )
}
