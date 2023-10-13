import firebaseApp from "@config/firebase"
import "firebase/database"
import { getDatabase, ref, set, get } from "firebase/database"

export const likeVideo = async (
  videoId: string,
  userId: number,
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

    const timestamp = Date.now()

    let updatedLikeCount = likeCount
    let updatedDislikeCount = dislikeCount

    if (currentInteraction === "like") {
      if (alreadyLiked) {
        await set(likesRef, { ...likedSnapshot.val(), [userId]: false })
        updatedLikeCount -= 1
      } else {
        await set(likesRef, {
          ...likedSnapshot.val(),
          timestamp,
          [userId]: true,
        })
        updatedLikeCount += 1
        if (alreadyDisliked) {
          await set(dislikesRef, { ...dislikedSnapshot.val(), [userId]: false })
          updatedDislikeCount -= 1
        }
      }
    } else if (currentInteraction === "dislike") {
      if (alreadyDisliked) {
        await set(dislikesRef, { ...dislikedSnapshot.val(), [userId]: false })
        updatedDislikeCount -= 1
      } else {
        await set(dislikesRef, {
          ...dislikedSnapshot.val(),
          timestamp,
          [userId]: true,
        })
        updatedDislikeCount += 1
        if (alreadyLiked) {
          await set(likesRef, { ...likedSnapshot.val(), [userId]: false })
          updatedLikeCount -= 1
        }
      }
    } else {
      console.log("Invalid interaction")
    }

    await set(likeCountRef, updatedLikeCount)
    await set(dislikeCountRef, updatedDislikeCount)

    return { likeCount, dislikeCount }
  } catch (error) {
    console.error("Error toggling like/dislike:", error)
    throw error
  }
}

export default likeVideo
