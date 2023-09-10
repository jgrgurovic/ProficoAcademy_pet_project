import React from "react"
import { FaSearch } from "react-icons/fa"
const SearchBar = () => {
  return (
    <div className="p-2 relative">
      <input
        type="text"
        placeholder="Search..."
        spellCheck="false"
        style={{ width: "700px", outline: "none" }}
        className="rounded-md p-1 text-center text-black rounded-lg flex-shrink-0 "
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <FaSearch className="text-black mr-1" />
      </div>
    </div>
  )
}

export default SearchBar
