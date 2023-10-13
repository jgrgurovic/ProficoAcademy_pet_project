import {
  ref,
  get,
  getDatabase,
  orderByChild,
  query,
  limitToLast,
} from "firebase/database"
import firebaseApp from "@config/firebase"

const db = getDatabase(firebaseApp)

class FirebaseService {
  private async getLikeDislikeStatus(type: string, id: string) {
    const interactionType = type === "podcast" ? "podcasts" : "videos"
    const likesRef = ref(db, `data/${interactionType}/interactions/likes/${id}`)
    const dislikesRef = ref(
      db,
      `data/${interactionType}/interactions/dislikes/${id}`
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
    return this.getLikeDislikeStatus("podcast", id)
  }

  async getLikesAndDislikesVideo(id: string) {
    return this.getLikeDislikeStatus("video", id)
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

      get(limitedOrderedQuery).then((snapshot) => {
        if (snapshot.exists()) {
          const bookmarksData = snapshot.val()
          console.log("Newest Bookmarks:", bookmarksData)
        } else {
          console.log("No bookmarks found for user.")
        }
      })
    } catch (error) {
      console.error("Error fetching users bookmarks:", error)
    }
  }

  async getAllUserBookmarks(userId: number) {
    try {
      const bookmarksRef = ref(db, `data/users/${userId}/bookmarks`)

      const orderedQuery = query(bookmarksRef, orderByChild("timestamp"))
      const snapshot = await get(orderedQuery)

      if (snapshot.exists()) {
        const bookmarksData = snapshot.val()
        console.log("User Bookmarks:", bookmarksData)
      } else {
        console.log("No bookmarks found for user.")
      }
    } catch (error) {
      console.error("Error fetching user's bookmarks:", error)
    }
  }

  async getNewestContent() {
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
        const newestVideos = Object.values(videoSnapshot.val())
        const newestPodcasts = Object.values(podcastSnapshot.val())
        console.log("Latest added videos:", newestVideos)
        console.log("Latest added podcasts", newestPodcasts)
        return { newestVideos, newestPodcasts }
      }
    } catch (error) {
      console.error("Error fetching newest videos/podcasts:", error)
    }
  }

  private async getLikedItems(
    userId: number,
    dataPath: string,
    itemPath: string,
    itemIdField: string,
    interactionType: string
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
                  const isPodcast = interactionType === "podcast"

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
      "podcast"
    )
  }

  async getLikedVideos(userId: number): Promise<any[]> {
    return this.getLikedItems(
      userId,
      "data/videos/interactions/likes",
      "data/content",
      "videoId",
      "video"
    )
  }

  async getAllCombinedLikes(userId: number) {
    try {
      const likedEpisodes = await this.getUserLikedEpisodes(userId)
      const likedVideos = await this.getLikedVideos(userId)

      const combinedLikes = [...likedEpisodes, ...likedVideos]

      combinedLikes.sort((a, b) => b.timestamp - a.timestamp)

      console.log(combinedLikes)
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

      console.log(latestLikes)
      return latestLikes
    } catch (error) {
      return []
    }
  }
}

const firebaseService = new FirebaseService()
export default firebaseService
