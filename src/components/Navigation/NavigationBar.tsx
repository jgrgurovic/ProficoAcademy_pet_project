"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import navTabs from "../../../config/navbar"

const NavigationBar = () => {
  const pathname = usePathname()

  return (
    <div>
      <ul className="hidden sm:flex justify-between space-x-8">
        {navTabs.map((item, index) => (
          <li key={index} className="font-courier-prime text-xl text-white">
            <Link
              href={item.href}
              className={`${
                pathname === item.href ? "text-mainRed" : "hover:text-mainRed"
              } transition duration-300 ease-in`}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavigationBar
