"use client"
import React, { useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"
import Link from "next/link"
import Image from "next/image"
import firebaseService from "@/services/FirebaseService"
import { EpisodeItem, VideoItem } from "types/interfaces/Likes"
import { v4 as uuidv4 } from "uuid"

const AllLikesPage = () => {
  const [likedItems, setLikedItems] = useState<(EpisodeItem | VideoItem)[]>([])
  const { user } = useAuth()
  const userId = 1

  useEffect(() => {
    async function fetchLikedItems() {
      try {
        const allLikes = await firebaseService.getAllCombinedLikes(userId)
        setLikedItems(allLikes)
        console.log(allLikes)
      } catch (error) {
        console.error("Error fetching liked items:", error)
      }
    }

    fetchLikedItems()
  }, [])

  return (
    <div>
      <div className="inline-block mx-24">
        <h1 className="text-center text-4xl text-white my-12">
          Here are all your likes,
        </h1>
        <Link href="/profile">
          <h2 className="text-mainRed text-4xl hover:scale-105 transition-transform duration-300">
            {user?.name}
          </h2>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-24 group">
        {likedItems.map((item) => (
          <div
            key={uuidv4()}
            className="bg-white/10 hover:shadow-2xl rounded-lg overflow-hidden shadow-md m-4 transform transition-transform duration-300 group-hover:scale-90 hover:!scale-110">
            <Link
              href={
                "episodeId" in item
                  ? `/podcasts/${item.episodeId}`
                  : `/videos/${item.videoId}`
              }
              target="_blank"
              rel="noopener noreferrer">
              <div>
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
                <h3 className="text-lg font-semibold mt-2 p-2">
                  {"title" in item.itemData
                    ? item.itemData.title
                    : item.itemData.snippet.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllLikesPage
