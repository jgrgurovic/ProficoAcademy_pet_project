import firebaseApp from "@config/firebase"
import "firebase/database"
import { getDatabase, ref, set, remove, get } from "firebase/database"
import { showToast } from "@/components/toastMessage"
import { ContentType } from "@utils/enums/contentTypes"

export const toggleBookmark = async (
  user: number,
  item: string,
  contentData: any,
  contentType: ContentType
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
    } else {
      const timestamp = Date.now()
      const dataToStore = {
        contentData,
        timestamp,
        contentType,
        isBookmarked: true,
      }
      await set(bookmarkRef, dataToStore)
    }
  } catch (error) {
    showToast("An error occurred. Please try again later :(")
  }
}
