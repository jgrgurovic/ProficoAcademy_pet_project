"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"
import firebaseService from "@/services/FirebaseService"
import { EpisodeItem, VideoItem } from "types/interfaces/Bookmarks"
import { v4 as uuidv4 } from "uuid"

const Bookmarks = () => {
  const { user } = useAuth()
  const userId = user?.id
  const [bookmarks, setBookmarks] = useState<(EpisodeItem | VideoItem)[]>([])

  useEffect(() => {
    async function fetchBookmarks() {
      if (userId !== undefined) {
        try {
          const bookmarksData = await firebaseService.getAllUserBookmarks(
            userId
          )
          if (bookmarksData) {
            const bookmarksArray: (EpisodeItem | VideoItem)[] =
              Object.values(bookmarksData)
            setBookmarks(bookmarksArray)
            console.log(bookmarksArray)
          }
        } catch (error) {
          console.error("Error fetching bookmarks:", error)
        }
      }
    }

    fetchBookmarks()
  }, [userId])

  return (
    <div>
      <div className="inline-block mx-24">
        <h1 className="text-center text-4xl text-white my-12">
          Here are all your bookmarks,
        </h1>
        <Link href="/profile">
          <h2 className="text-mainRed text-4xl hover:scale-105 transition-transform duration-300">
            {user?.name}
          </h2>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-24 group">
        {bookmarks.map((bookmark) => (
          <div
            key={uuidv4()}
            className="bg-white/10 m-4 hover:shadow-2xl rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-90 hover:!scale-110">
            <Link
              href={
                bookmark.contentType === "podcast"
                  ? `/podcasts/${bookmark.contentData.id}`
                  : `/videos/${bookmark.contentData.id}`
              }>
              <div>
                <div
                  style={{
                    height: "180px",
                    overflow: "hidden",
                  }}>
                  <Image
                    src={
                      bookmark.contentType === "video"
                        ? bookmark.contentData.snippet.thumbnails.maxres.url
                        : bookmark.contentData.coverArt.sources[2].url
                    }
                    alt={
                      bookmark.contentType === "video"
                        ? bookmark.contentData.snippet.title
                        : bookmark.contentData.name
                    }
                    width={480}
                    height={360}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-semibold my-2">
                    {bookmark.contentType === "video"
                      ? bookmark.contentData.snippet.title
                      : bookmark.contentData.name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bookmarks
