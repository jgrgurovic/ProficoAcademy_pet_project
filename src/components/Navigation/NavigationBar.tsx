"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import navTabs from "@config/navbar"

const NavigationBar = () => {
  const pathname = usePathname()

  return (
    <div>
      <ul className="flex justify-between md:space-x-12 space-x-3 bg-black/70 md:bg-transparent rounded-3xl py-2 px-3 md:p-0 md:rounded-none">
        {navTabs.map((item, index) => (
          <li
            key={index}
            className="font-courier-prime text-lg text-white md:text-xl font-bold">
            <Link
              href={item.path}
              className={`${
                pathname === item.path ? "text-mainRed" : "hover:text-mainRed"
              } transition duration-300 ease-in`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavigationBar
