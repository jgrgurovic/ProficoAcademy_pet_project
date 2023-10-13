import likeEpisode from "@utils/static/likePodcasts"
import likeVideo from "@utils/static/likeVideos"

class InteractionService {
  async handleThumbsUp(
    userId: number,
    contentId: string,
    likeStatus: { [key: string]: boolean },
    dislikeStatus: { [key: string]: boolean },
    setLikeCount: React.Dispatch<React.SetStateAction<number>>,
    setDislikeCount: React.Dispatch<React.SetStateAction<number>>,
    setLikeStatus: React.Dispatch<
      React.SetStateAction<{ [key: string]: boolean }>
    >,
    setDislikeStatus: React.Dispatch<
      React.SetStateAction<{ [key: string]: boolean }>
    >,
    likeCount: number,
    dislikeCount: number,
    contentType: string
  ) {
    if (!userId) {
      throw new Error("User ID is missing")
    }

    const currentLikeStatus = likeStatus[userId]
    const currentDislikeStatus = dislikeStatus[userId]

    const updatedLikeStatus = { ...likeStatus }
    const updatedDislikeStatus = { ...dislikeStatus }

    if (!currentLikeStatus) {
      updatedLikeStatus[userId] = true
      setLikeCount(likeCount + 1)

      if (currentDislikeStatus) {
        updatedDislikeStatus[userId] = false
        setDislikeCount(dislikeCount - 1)
      }
    } else {
      updatedLikeStatus[userId] = false
      setLikeCount(likeCount - 1)
    }

    setLikeStatus(updatedLikeStatus)
    setDislikeStatus(updatedDislikeStatus)

    try {
      if (contentType === "video") {
        await likeVideo(contentId, userId, "like", likeCount, dislikeCount)
      } else if (contentType === "episode") {
        await likeEpisode(contentId, userId, "like", likeCount, dislikeCount)
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  async handleThumbsDown(
    userId: number,
    contentId: string,
    likeStatus: { [key: string]: boolean },
    dislikeStatus: { [key: string]: boolean },
    setLikeCount: React.Dispatch<React.SetStateAction<number>>,
    setDislikeCount: React.Dispatch<React.SetStateAction<number>>,
    setLikeStatus: React.Dispatch<
      React.SetStateAction<{ [key: string]: boolean }>
    >,
    setDislikeStatus: React.Dispatch<
      React.SetStateAction<{ [key: string]: boolean }>
    >,
    likeCount: number,
    dislikeCount: number,
    contentType: string
  ) {
    const updatedLikeStatus = { ...likeStatus }
    const updatedDislikeStatus = { ...dislikeStatus }

    if (!updatedDislikeStatus[userId]) {
      updatedDislikeStatus[userId] = true
      setDislikeCount(dislikeCount + 1)

      if (updatedLikeStatus[userId]) {
        updatedLikeStatus[userId] = false
        setLikeCount(likeCount - 1)
      }
    } else {
      updatedDislikeStatus[userId] = false
      setDislikeCount(dislikeCount - 1)
    }

    setLikeStatus(updatedLikeStatus)
    setDislikeStatus(updatedDislikeStatus)

    try {
      if (contentType === "video") {
        await likeVideo(contentId, userId, "dislike", likeCount, dislikeCount)
      } else if (contentType === "episode") {
        await likeEpisode(contentId, userId, "dislike", likeCount, dislikeCount)
      }
    } catch (error) {
      console.error("Error toggling dislike:", error)
    }
  }
}
const interactionService = new InteractionService()
export default interactionService
