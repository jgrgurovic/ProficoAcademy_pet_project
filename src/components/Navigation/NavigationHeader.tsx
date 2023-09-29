"use client"
import Link from "next/link"
import Image from "next/image"
import NavigationBar from "./NavigationBar"
import useAuth from "../../hooks/useAuth"
import styles from "./navigation.module.css"
import Logo from "../../../public/images/logos/logo_tc.png"
const NavigationHeader = () => {
  const { token, user } = useAuth()

  return (
    <div className={`${styles.mobile_nav} ${styles.nav}`}>
      <div className="container mx-auto flex justify-between items-center py-2 ">
        <NavigationBar />
        <Image
          src={Logo}
          alt="true crime logo"
          width={150}
          height={120}
          className={styles.logo}
        />
        <div className="hidden md:flex md:relative items-center ">
          <div className="ml-auto mr-4">
            {token ? (
              <Link href="/profile" className="text-xl text-white">
                {user ? (
                  <Image
                    src={user.avatar}
                    alt="User Avatar"
                    width={50}
                    height={50}
                    className="rounded-full border-2"
                  />
                ) : null}
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
        <hr className=" lg:visible border-t-1 border-white w-10/12 mx-auto opacity-100" />
      </div>
    </div>
  )
}

export default NavigationHeader
