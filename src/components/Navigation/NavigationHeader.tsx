"use client"
import Link from "next/link"
import Image from "next/image"
import NavigationBar from "./NavigationBar"
import useAuth from "@/hooks/useAuth"
import Logo from "@public/images/logos/logo_tc.png"

const NavigationHeader = () => {
  const { user } = useAuth()

  return (
    <div className="fixed bottom-10 z-40 left-1/2 transform -translate-x-1/2 md:relative md:bottom-0 md:z-0 md:left-auto md:transform-none">
      <div className="container mx-auto flex justify-between items-center py-2 ">
        <NavigationBar />
        <Link href="/">
          <Image
            src={Logo}
            alt="true crime logo"
            width={150}
            height={120}
            className="md:block hidden hover:scale-105 transition duration-300 ease-in-out"
          />
        </Link>
        <div className="hidden md:flex md:relative items-center ">
          <div className="ml-auto mr-4">
            {user ? (
              <Link href="/profile" className="text-xl text-white">
                <Image
                  src={user.avatar}
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="rounded-full border-2"
                />
              </Link>
            ) : (
              <Link href="/login" className="text-xl text-white">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:relative items-center">
        <hr className="lg:visible border-t-1 border-white w-10/12 mx-auto opacity-100" />
      </div>
    </div>
  )
}

export default NavigationHeader
