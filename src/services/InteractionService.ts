import likeEpisode from "@utils/static/likePodcasts"
import likeVideo from "@utils/static/likeVideos"
import { InteractionType } from "@utils/enums/interactionTypes"
import { ContentType } from "@utils/enums/contentTypes"

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
    contentType: ContentType
  ) {
    if (!userId) {
      throw new Error("User ID is missing")
    }

    const isAlreadyLiked = likeStatus[userId]
    const isAlreadyDisliked = dislikeStatus[userId]

    const updatedLikeStatus = { ...likeStatus }
    const updatedDislikeStatus = { ...dislikeStatus }

    if (isAlreadyLiked) {
      updatedLikeStatus[userId] = false
      setLikeCount(likeCount - 1)
    } else {
      updatedLikeStatus[userId] = true
      setLikeCount(likeCount + 1)

      if (isAlreadyDisliked) {
        updatedDislikeStatus[userId] = false
        setDislikeCount(dislikeCount - 1)
      }
    }

    setLikeStatus(updatedLikeStatus)
    setDislikeStatus(updatedDislikeStatus)

    try {
      if (contentType === ContentType.Video) {
        await likeVideo(
          contentId,
          userId,
          InteractionType.Like,
          likeCount,
          dislikeCount
        )
      } else if (contentType === ContentType.Podcast) {
        await likeEpisode(
          contentId,
          userId,
          InteractionType.Like,
          likeCount,
          dislikeCount
        )
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
    contentType: ContentType
  ) {
    const updatedLikeStatus = { ...likeStatus }
    const updatedDislikeStatus = { ...dislikeStatus }

    if (updatedDislikeStatus[userId]) {
      updatedDislikeStatus[userId] = false
      setDislikeCount(dislikeCount - 1)
    } else {
      updatedDislikeStatus[userId] = true
      setDislikeCount(dislikeCount + 1)

      if (updatedLikeStatus[userId]) {
        updatedLikeStatus[userId] = false
        setLikeCount(likeCount - 1)
      }
    }

    setLikeStatus(updatedLikeStatus)
    setDislikeStatus(updatedDislikeStatus)

    try {
      if (contentType === ContentType.Video) {
        await likeVideo(
          contentId,
          userId,
          InteractionType.Dislike,
          likeCount,
          dislikeCount
        )
      } else if (contentType === ContentType.Podcast) {
        await likeEpisode(
          contentId,
          userId,
          InteractionType.Dislike,
          likeCount,
          dislikeCount
        )
      }
    } catch (error) {
      console.error("Error toggling dislike:", error)
    }
  }
}
const interactionService = new InteractionService()
export default interactionService
