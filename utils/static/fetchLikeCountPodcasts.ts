import { get, ref, getDatabase } from "firebase/database"
import firebaseApp from "@config/firebase"

const fetchLikeCount = async (episodeId: string, interactionType: string) => {
  const db = getDatabase(firebaseApp)

  const countType = interactionType === "like" ? "likeCount" : "dislikeCount"
  const countRef = ref(
    db,
    `data/podcasts/interactions/${countType}/${episodeId}`
  )

  try {
    const countSnapshot = await get(countRef)

    if (countSnapshot.exists()) {
      return countSnapshot.val()
    } else {
      return 0
    }
  } catch (error) {
    console.error(`Error fetching count:`, error)
    return 0
  }
}

export default fetchLikeCount
