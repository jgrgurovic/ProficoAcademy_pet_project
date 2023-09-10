"use client"
import React, { useState } from "react"
import Image from "next/image"
import FilterIcon from "../../public/filter.svg" // Replace with the actual path to your filter icon

const FilterMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const options = ["Cold Case", "Solved Case", "Celebrity Case"] // Add more options as needed

  return (
    <div className="relative">
      <button
        className="flex items-center p-2  rounded-md"
        onClick={toggleDropdown}>
        <Image
          src={FilterIcon}
          alt="Filter icon"
          width={33}
          height={33}
          onClick={toggleDropdown}
        />
      </button>
      {isOpen && (
        <div className="absolute mt-2 p-2 border border-gray-300 rounded-md w-[200px]">
          <ul className="whitespace-no-wrap ">
            {options.map((option) => (
              <li
                key={option}
                className="cursor-pointer hover:text-mainRed hover:bg-white hover:scale-105">
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FilterMenu
