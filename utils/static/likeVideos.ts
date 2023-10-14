import firebaseApp from "@config/firebase"
import "firebase/database"
import { getDatabase, ref, set, get } from "firebase/database"
import { showToast } from "@/components/toastMessage"
import { InteractionType } from "@utils/enums/interactionTypes"

export const likeVideo = async (
  videoId: string,
  userId: number,
  currentInteraction: InteractionType,
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

    const handleLike = async () => {
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

    const handleDislike = async () => {
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

    switch (currentInteraction) {
      case InteractionType.Like:
        if (alreadyLiked) {
          await set(likesRef, { ...likedSnapshot.val(), [userId]: false })
          updatedLikeCount -= 1
        } else {
          await handleLike()
        }
        break

      case InteractionType.Dislike:
        if (alreadyDisliked) {
          await set(dislikesRef, { ...dislikedSnapshot.val(), [userId]: false })
          updatedDislikeCount -= 1
        } else {
          await handleDislike()
        }
        break

      default:
        showToast("Invalid interaction.")
    }

    await set(likeCountRef, updatedLikeCount)
    await set(dislikeCountRef, updatedDislikeCount)

    return { likeCount: updatedLikeCount, dislikeCount: updatedDislikeCount }
  } catch (error) {
    showToast("An error occurred. Please try again later.")
    throw error
  }
}

export default likeVideo
