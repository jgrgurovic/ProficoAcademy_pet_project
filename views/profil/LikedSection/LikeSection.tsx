import React, { useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"
import Link from "next/link"
import Image from "next/image"
import firebaseService from "@/services/FirebaseService"
import { EpisodeItem, VideoItem } from "types/interfaces/Likes"
import { v4 as uuidv4 } from "uuid"

const LikedSection = () => {
  const [likedItems, setLikedItems] = useState<(EpisodeItem | VideoItem)[]>([])
  const { user } = useAuth()
  const userId = user?.id
  useEffect(() => {
    async function fetchLikedItems() {
      if (userId !== undefined) {
        try {
          const latestLikes = await firebaseService.getLatestCombinedLikes(
            userId
          )
          setLikedItems(latestLikes)
        } catch (error) {
          console.error("Error fetching liked items:", error)
        }
      }
    }
    fetchLikedItems()
  }, [user])

  return (
    <section className="flex-col m-12">
      <div className="flex justify-between">
        <div className="ml-0">
          <Link
            href="/profile/liked_items"
            className="text-white text-3xl tracking-wide hover:underline">
            Your Likes
          </Link>
        </div>
        <div className="mr-0 ml-auto">
          <Link
            href="/profile/liked_items"
            className="text-gray-400 hover:underline">
            Display all
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-12 group">
        {likedItems.map((item) => (
          <div
            key={uuidv4()}
            className="bg-white/10 hover:shadow-2xl rounded-lg overflow-hidden shadow-md mb-4 transform transition-transform duration-300 group-hover:scale-90 hover:!scale-110">
            <Link
              href={
                "episodeId" in item
                  ? `/podcasts/${item.episodeId}`
                  : `/videos/${item.videoId}`
              }
              target="_blank"
              rel="noopener noreferrer">
              <div className="group-hover:blur-sm hover:!blur-none">
                <div
                  style={{
                    height: "180px",
                    overflow: "hidden",
                  }}>
                  <Image
                    src={
                      "coverArtUrl" in item.itemData
                        ? item.itemData.coverArtUrl
                        : item.itemData.snippet.thumbnails.maxres.url
                    }
                    alt={
                      "title" in item.itemData
                        ? item.itemData.title
                        : item.itemData.snippet.title
                    }
                    width={480}
                    height={360}
                  />
                </div>
                <h3 className="text-lg font-semibold mt-2 p-4">
                  {"title" in item.itemData
                    ? item.itemData.title
                    : item.itemData.snippet.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LikedSection
