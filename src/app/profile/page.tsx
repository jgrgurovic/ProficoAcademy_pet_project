"use client"

import useAuth from "@/hooks/useAuth"
import Image from "next/image"
import BookmarkSection from "@views/profil/BookmarkSection"
import LikedSection from "@views/profil/LikedSection"

const ProfilePage = () => {
  const { user, loading, error } = useAuth()

  if (loading) return <div>Loading...</div>

  if (error) return <div>{error}</div>

  if (!loading && !user) return <div>Not logged in</div>

  if (!user) {
    // added for TS, should not happen
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }
  const [firstName, lastName] = user.name.split(" ")

  return (
    <section className="font-medium flex flex-col">
      <section className="relative bg-black/20 w h-1/2 rounded-2xl m-12 shadow-2xl">
        <div className="flex items-center">
          <div className="w-fit m-12">
            <Image
              src={user.avatar}
              width={150}
              height={150}
              className="rounded-full"
              alt="profile picture"
            />
          </div>
          <div className="ml-8">
            <h2 className="text-white font-bold text-5xl tracking-wide leading-relaxed">
              {firstName} <br /> {lastName}
            </h2>
          </div>
        </div>
        <button
          className="absolute top-4 right-4 bg-black/40 text-white lg:text-xl font-semibold py-2 px-4 rounded-full hover:scale-105 hover:shadow-2xl sm:tex-md"
          onClick={handleLogout}>
          Log out
        </button>
      </section>
      <BookmarkSection />
      <LikedSection />
    </section>
  )
}

export default ProfilePage
