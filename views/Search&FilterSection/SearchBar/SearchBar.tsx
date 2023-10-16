import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const query = event.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  return (
    <div className="relative flex items-center p-2 ">
      <div className="relative">
        <input
          id="searchInput"
          type="text"
          placeholder="Search videos..."
          autoComplete="off"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: "700px", outline: "none" }}
          className="p-1 text-center text-black rounded-3xl bg-white/10 shadow-2xl hover:scale-105 focus:scale-105 focus:bg-white transition-background duration-300 ease-in"
        />
        <div className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none">
          <FaSearch className="text-black mr-1" />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
