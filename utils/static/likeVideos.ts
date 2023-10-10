import firebaseApp from "@config/firebase"
import "firebase/database"
import { getDatabase, ref, set, get } from "firebase/database"

export const likeVideo = async (
  videoId: string,
  userId: any,
  currentInteraction: string,
  likeCount: number,
  dislikeCount: number
) => {
  const db = getDatabase(firebaseApp)

  const likesRef = ref(db, `data/videos/interactions/likes/${videoId}`)
  const dislikesRef = ref(db, `data/videos/interactions/dislikes/${videoId}`)
  const likeCountRef = ref(db, `data/videos/interactions/likeCount/${videoId}`)
  const dislikeCountRef = ref(
    db,
    `data/videos/interactions/dislikeCount/${videoId}`
  )

  try {
    const likedSnapshot = await get(likesRef)
    const dislikedSnapshot = await get(dislikesRef)
    const alreadyLiked = likedSnapshot.exists() && likedSnapshot.val()[userId]
    const alreadyDisliked =
      dislikedSnapshot.exists() && dislikedSnapshot.val()[userId]

    if (currentInteraction === "like") {
      if (alreadyLiked) {
        await set(likesRef, { ...likedSnapshot.val(), [userId]: false })
        likeCount -= 1
      } else {
        await set(likesRef, { ...likedSnapshot.val(), [userId]: true })
        likeCount += 1
        if (alreadyDisliked) {
          await set(dislikesRef, { ...dislikedSnapshot.val(), [userId]: false })
          dislikeCount -= 1
        }
      }
    } else if (currentInteraction === "dislike") {
      if (alreadyDisliked) {
        await set(dislikesRef, { ...dislikedSnapshot.val(), [userId]: false })
        dislikeCount -= 1
      } else {
        await set(dislikesRef, { ...dislikedSnapshot.val(), [userId]: true })
        dislikeCount += 1
        if (alreadyLiked) {
          await set(likesRef, { ...likedSnapshot.val(), [userId]: false })
          likeCount -= 1
        }
      }
    } else {
      console.log("Invalid interaction")
    }

    await set(likeCountRef, likeCount)
    await set(dislikeCountRef, dislikeCount)

    return { likeCount, dislikeCount }
  } catch (error) {
    console.error("Error toggling like/dislike:", error)
    throw error
  }
}

export default likeVideo