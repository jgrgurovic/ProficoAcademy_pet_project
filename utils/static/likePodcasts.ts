import firebaseApp from "@config/firebase"
import "firebase/database"
import { getDatabase, ref, set, get } from "firebase/database"

export const likeEpisode = async (
  episodeId: string,
  userId: any,
  currentInteraction: string,
  likeCount: number,
  dislikeCount: number
) => {
  const db = getDatabase(firebaseApp)

  const likesRef = ref(db, `data/podcasts/interactions/likes/${episodeId}`)
  const dislikesRef = ref(
    db,
    `data/podcasts/interactions/dislikes/${episodeId}`
  )
  const likeCountRef = ref(
    db,
    `data/podcasts/interactions/likeCount/${episodeId}`
  )
  const dislikeCountRef = ref(
    db,
    `data/podcasts/interactions/dislikeCount/${episodeId}`
  )

  try {
    const likedSnapshot = await get(likesRef)
    const dislikedSnapshot = await get(dislikesRef)
    const alreadyLiked = likedSnapshot.exists() && likedSnapshot.val()[userId]
    const alreadyDisliked =
      dislikedSnapshot.exists() && dislikedSnapshot.val()[userId]
    const timestamp = Date.now()

    if (currentInteraction === "like") {
      if (alreadyLiked) {
        await set(likesRef, { ...likedSnapshot.val(), [userId]: false })
        likeCount -= 1
      } else {
        await set(likesRef, {
          ...likedSnapshot.val(),
          timestamp,
          [userId]: true,
        })
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
        await set(dislikesRef, {
          ...dislikedSnapshot.val(),
          timestamp,
          [userId]: true,
        })
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

export default likeEpisode
