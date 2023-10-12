import firebaseApp from "@config/firebase"
import "firebase/database"
import { getDatabase, ref, set, remove, get } from "firebase/database"

export const toggleBookmark = async (
  user: number,
  item: string,
  contentData: any
) => {
  if (!user) {
    console.error("User not authenticated")
    return
  }

  const database = getDatabase(firebaseApp)
  const bookmarkRef = ref(database, `data/users/${user}/bookmarks/${item}`)

  try {
    const bookmarkSnapshot = await get(bookmarkRef)
    const isAlreadyBookmarkedInFirebase = bookmarkSnapshot.exists()

    if (isAlreadyBookmarkedInFirebase) {
      await remove(bookmarkRef)
      console.log("Removed bookmark in Firebase")
    } else {
      const timestamp = Date.now()
      const dataToStore = {
        contentData,
        timestamp,
        isBookmarked: true,
      }
      await set(bookmarkRef, dataToStore)
      console.log("Added bookmark in Firebase")
    }
  } catch (error) {
    console.error("Error toggling bookmark in Firebase:", error)
  }
}
