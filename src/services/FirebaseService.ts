import { ref, get, getDatabase } from "firebase/database"
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
}

const firebaseService = new FirebaseService()
export default firebaseService
