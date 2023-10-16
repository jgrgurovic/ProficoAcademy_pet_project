import firebaseApp from "@config/firebase"
import "firebase/database"
import { getDatabase, ref, set, get } from "firebase/database"
import { showToast } from "@/components/toastMessage"
import { InteractionType } from "@utils/enums/interactionTypes"
import { ContentType } from "@utils/enums/contentTypes"
export const likeEpisode = async (
  episodeId: string,
  userId: number,
  currentInteraction: InteractionType,
  contentType:ContentType,
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

    let updatedLikeCount = likeCount
    let updatedDislikeCount = dislikeCount

    const handleLike = async () => {
      await set(likesRef, {
        ...likedSnapshot.val(),
        timestamp,
        ContentType,
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
        ContentType,
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

export default likeEpisode
