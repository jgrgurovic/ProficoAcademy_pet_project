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
  async getLikesAndDislikesPodcast(id: any) {
    try {
      const likesRef = ref(db, `data/podcasts/interactions/likes/${id}`)
      const likeStatusSnapshot = await get(likesRef)
      const likeStatus = likeStatusSnapshot.val() || {}

      const dislikesRef = ref(db, `data/podcasts/interactions/dislikes/${id}`)
      const dislikeStatusSnapshot = await get(dislikesRef)
      const dislikeStatus = dislikeStatusSnapshot.val() || {}

      return { likeStatus, dislikeStatus }
    } catch (error) {
      console.error("Error fetching likes and dislikes:", error)
      throw error
    }
  }
  async getLikesAndDislikesVideo(id: any) {
    try {
      const likesRef = ref(db, `data/videos/interactions/likes/${id}`)
      const likeStatusSnapshot = await get(likesRef)
      const likeStatus = likeStatusSnapshot.val() || {}

      const dislikesRef = ref(db, `data/videos/interactions/dislikes/${id}`)
      const dislikeStatusSnapshot = await get(dislikesRef)
      const dislikeStatus = dislikeStatusSnapshot.val() || {}

      return { likeStatus, dislikeStatus }
    } catch (error) {
      console.error("Error fetching likes and dislikes:", error)
      throw error
    }
  }
  async getBookmarks(userId: any, id: string) {
    try {
      const bookmarkRef = ref(db, `data/users/${userId}/bookmarks/${id}`)
      const bookmarkStatusSnapshot = await get(bookmarkRef)

      return bookmarkStatusSnapshot.exists()
    } catch (error) {
      console.error("Error fetching bookmarks:", error)
      throw error
    }
  }
  async getLatestUserBookmarks(userId: any, limit: number) {
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
  async getAllUserBookmarks(userId: any) {
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
  async getUserLikedEpisodes(userId: any): Promise<
    {
      episodeId: string
      episodeData: any
      timestamp: number
    }[]
  > {
    try {
      const likedEpisodesRef = ref(db, `data/podcasts/interactions/likes`)
      const likedEpisodesSnapshot = await get(likedEpisodesRef)

      if (likedEpisodesSnapshot.exists()) {
        const likedEpisodeData = []

        for (const episodeId in likedEpisodesSnapshot.val()) {
          if (
            likedEpisodesSnapshot.val().hasOwnProperty(episodeId) &&
            likedEpisodesSnapshot.val()[episodeId][userId]
          ) {
            const timestamp = likedEpisodesSnapshot.val()[episodeId].timestamp
            likedEpisodeData.push({ episodeId, timestamp })
          }
        }

        if (likedEpisodeData.length > 0) {
          console.log("Liked Episode Data:", likedEpisodeData)
          const likedEpisodesData = []

          for (const likedEpisode of likedEpisodeData) {
            const episodeId = likedEpisode.episodeId
            const timestamp = likedEpisode.timestamp

            const episodesRef = ref(db, "data/podcasts/episodes")
            const episodesSnapshot = await get(episodesRef)

            if (episodesSnapshot.exists()) {
              const episodesData = episodesSnapshot.val()

              for (const uid in episodesData) {
                if (episodesData.hasOwnProperty(uid)) {
                  const episodeData = episodesData[uid]
                  if (episodeData.id === episodeId) {
                    likedEpisodesData.push({
                      episodeId,
                      episodeData,
                      timestamp,
                    })
                  }
                }
              }
            }
          }

          likedEpisodeData.sort((a, b) => b.timestamp - a.timestamp)
          if (likedEpisodesData.length > 0) {
            return likedEpisodesData
          }
        } else {
          console.log("No liked episodes found for the user.")
        }
      } else {
        console.log("No liked episodes found for the user.")
      }
      return []
    } catch (error) {
      console.error("Error gettin users liked episodes:", error)
      return []
    }
  }

  async getLikedVideos(userId: any): Promise<
    {
      videoId: string
      videoData: any
      timestamp: number
    }[]
  > {
    try {
      const likedVideosRef = ref(db, `data/videos/interactions/likes`)
      const likedVideosSnapshot = await get(likedVideosRef)

      if (likedVideosSnapshot.exists()) {
        const likedVideoData = []

        for (const videoId in likedVideosSnapshot.val()) {
          if (
            likedVideosSnapshot.val().hasOwnProperty(videoId) &&
            likedVideosSnapshot.val()[videoId][userId]
          ) {
            const timestamp = likedVideosSnapshot.val()[videoId].timestamp
            likedVideoData.push({ videoId, timestamp })
          }
        }

        if (likedVideoData.length > 0) {
          console.log("Liked Video IDs:", likedVideoData)
          const likedVideosData = []

          for (const likedVideo of likedVideoData) {
            const videoId = likedVideo.videoId
            const timestamp = likedVideo.timestamp

            const videosRef = ref(db, "data/content")
            const videosSnapshot = await get(videosRef)

            if (videosSnapshot.exists()) {
              const videosData = videosSnapshot.val()

              for (const uid in videosData) {
                if (videosData.hasOwnProperty(uid)) {
                  const videoData = videosData[uid]
                  if (videoData.snippet.resourceId.videoId === videoId) {
                    likedVideosData.push({
                      videoId,
                      videoData,
                      timestamp,
                    })
                  }
                }
              }
            }
          }

          likedVideoData.sort((a, b) => b.timestamp - a.timestamp)
          if (likedVideosData.length > 0) {
            console.log("Liked Videos Data:", likedVideosData)
            return likedVideosData
          }
        } else {
          console.log("No liked videos found for the user.")
        }
      } else {
        console.log("No liked videos found for the user.")
      }
      return []
    } catch (error) {
      console.error("Error gettin users liked videos:", error)
      return []
    }
  }
  async getAllCombinedLikes(userId: any) {
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
  async getLatestCombinedLikes(userId: any): Promise<any[]> {
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
