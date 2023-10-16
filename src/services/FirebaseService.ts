import {
  ref,
  get,
  set,
  push,
  getDatabase,
  orderByChild,
  query,
  limitToLast,
  serverTimestamp,
} from "firebase/database"
import firebaseApp from "@config/firebase"
import { ContentType } from "@utils/enums/contentTypes"

const db = getDatabase(firebaseApp)

interface CasesCardProps {
  id: string
}

class FirebaseService {
  private async getLikeDislikeStatus(type: ContentType, id: string) {
    const contentType = type === ContentType.Podcast ? "podcasts" : "videos"
    const likesRef = ref(db, `data/${contentType}/interactions/likes/${id}`)
    const dislikesRef = ref(
      db,
      `data/${contentType}/interactions/dislikes/${id}`
    )

    const [likeStatusSnapshot, dislikeStatusSnapshot] = await Promise.all([
      get(likesRef),
      get(dislikesRef),
    ])

    const likeStatus = likeStatusSnapshot.val() || {}
    const dislikeStatus = dislikeStatusSnapshot.val() || {}

    return { likeStatus, dislikeStatus }
  }

  async getLikesAndDislikesPodcast(id: string) {
    return this.getLikeDislikeStatus(ContentType.Podcast, id)
  }

  async getLikesAndDislikesVideo(id: string) {
    return this.getLikeDislikeStatus(ContentType.Video, id)
  }

  async getBookmarks(userId: number, id: string) {
    try {
      const bookmarkRef = ref(db, `data/users/${userId}/bookmarks/${id}`)
      const bookmarkStatusSnapshot = await get(bookmarkRef)

      return bookmarkStatusSnapshot.exists()
    } catch (error) {
      console.error("Error fetching bookmarks:", error)
      throw error
    }
  }

  async getLatestUserBookmarks(userId: number, limit: number) {
    try {
      const bookmarksRef = ref(db, `data/users/${userId}/bookmarks`)

      const orderedQuery = query(bookmarksRef, orderByChild("timestamp"))
      const limitedQuery = limitToLast(limit)
      const limitedOrderedQuery = query(orderedQuery, limitedQuery)

      const snapshot = await get(limitedOrderedQuery)

      if (snapshot.exists()) {
        if (snapshot.exists()) {
          const bookmarksData = snapshot.val()
          return bookmarksData
        } else {
          console.log("No bookmarks found for user.")
          return null
        }
      }
    } catch (error) {
      console.error("Error fetching users bookmarks:", error)
      throw error
    }
  }

  async getAllUserBookmarks(userId: number) {
    try {
      const bookmarksRef = ref(db, `data/users/${userId}/bookmarks`)

      const orderedQuery = query(bookmarksRef, orderByChild("timestamp"))
      const snapshot = await get(orderedQuery)

      if (snapshot.exists()) {
        const bookmarksData = snapshot.val()
        return bookmarksData
      } else {
        console.log("No bookmarks found for user.")
      }
    } catch (error) {
      console.error("Error fetching user's bookmarks:", error)
    }
  }

  async getNewestContent(): Promise<{
    newestVideos: CasesCardProps[]
    newestEpisodes: CasesCardProps[]
  } | null> {
    try {
      const newestVideosRef = ref(db, "data/content")
      const newestPodcastsRef = ref(db, "data/podcasts/episodes")

      const videoQuery = query(newestVideosRef, limitToLast(2))
      const podcastQuery = query(newestPodcastsRef, limitToLast(2))

      const [videoSnapshot, podcastSnapshot] = await Promise.all([
        get(videoQuery),
        get(podcastQuery),
      ])

      if (videoSnapshot.exists() && podcastSnapshot.exists()) {
        const newestVideos = Object.values(
          videoSnapshot.val()
        ) as CasesCardProps[]
        const newestEpisodes = Object.values(
          podcastSnapshot.val()
        ) as CasesCardProps[]
        return { newestVideos, newestEpisodes }
      }
      return null
    } catch (error) {
      console.error("Error fetching newest videos/podcasts:", error)
      return null
    }
  }

  private async getLikedItems(
    userId: number,
    dataPath: string,
    itemPath: string,
    itemIdField: string,
    contentType: ContentType
  ): Promise<any[]> {
    try {
      const likedItemsRef = ref(db, dataPath)
      const likedItemsSnapshot = await get(likedItemsRef)

      if (likedItemsSnapshot.exists()) {
        const likedItemsData = []

        for (const itemId in likedItemsSnapshot.val()) {
          if (
            likedItemsSnapshot.val().hasOwnProperty(itemId) &&
            likedItemsSnapshot.val()[itemId][userId]
          ) {
            const timestamp = likedItemsSnapshot.val()[itemId].timestamp
            likedItemsData.push({ [itemIdField]: itemId, timestamp })
          }
        }

        if (likedItemsData.length > 0) {
          const likedItemsDetails = []

          for (const likedItem of likedItemsData) {
            const itemID = likedItem[itemIdField]
            const timestamp = likedItem.timestamp

            const itemRef = ref(db, itemPath)
            const itemSnapshot = await get(itemRef)

            if (itemSnapshot.exists()) {
              const itemsData = itemSnapshot.val()

              for (const uid in itemsData) {
                if (itemsData.hasOwnProperty(uid)) {
                  const itemData = itemsData[uid]
                  const isPodcast = contentType === ContentType.Podcast

                  if (isPodcast) {
                    if (itemData.id === itemID) {
                      likedItemsDetails.push({
                        [itemIdField]: itemID,
                        itemData: itemData,
                        timestamp,
                      })
                    }
                  } else {
                    if (itemData.snippet.resourceId.videoId === itemID) {
                      likedItemsDetails.push({
                        [itemIdField]: itemID,
                        itemData: itemData,
                        timestamp,
                      })
                    }
                  }
                }
              }
            }
          }
          likedItemsDetails.sort((a, b) => b.timestamp - a.timestamp)

          if (likedItemsDetails.length > 0) {
            return likedItemsDetails
          }
        } else {
          console.log(`No liked items found for the user.`)
        }
      } else {
        console.log(`No liked items found for the user.`)
      }
      return []
    } catch (error) {
      console.error(`Error getting users liked items:`, error)
      return []
    }
  }

  async getUserLikedEpisodes(userId: number): Promise<any[]> {
    return this.getLikedItems(
      userId,
      "data/podcasts/interactions/likes",
      "data/podcasts/episodes",
      "episodeId",
      ContentType.Podcast
    )
  }

  async getLikedVideos(userId: number): Promise<any[]> {
    return this.getLikedItems(
      userId,
      "data/videos/interactions/likes",
      "data/content",
      "videoId",
      ContentType.Video
    )
  }

  async getAllCombinedLikes(userId: number) {
    try {
      const likedEpisodes = await this.getUserLikedEpisodes(userId)
      const likedVideos = await this.getLikedVideos(userId)

      const combinedLikes = [...likedEpisodes, ...likedVideos]

      combinedLikes.sort((a, b) => b.timestamp - a.timestamp)

      return combinedLikes
    } catch (error) {
      console.error("Error getting combined likes:", error)
      return []
    }
  }

  async getLatestCombinedLikes(userId: number): Promise<any[]> {
    try {
      const combinedLikes = await this.getAllCombinedLikes(userId)

      const latestLikes = combinedLikes.slice(0, 3)

      return latestLikes
    } catch (error) {
      return []
    }
  }
  async addCommentToContent(
    contentType: string,
    contentId: string,
    userId: number,
    username: string,
    text: string,
    avatar: string
  ) {
    try {
      const newCommentRef = push(
        ref(db, `${contentType}_comments/${contentId}`)
      )
      await set(newCommentRef, {
        userId: userId,
        username: username,
        avatar: avatar,
        text: text,
        timestamp: serverTimestamp(),
      })
    } catch (error) {
      console.error("Error adding comment:", error)
      throw error
    }
  }
}

const firebaseService = new FirebaseService()
export default firebaseService
