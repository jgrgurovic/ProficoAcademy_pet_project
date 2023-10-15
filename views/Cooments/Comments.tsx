import React, { useState, useEffect } from "react"
import Image from "next/image"
import useAuth from "@/hooks/useAuth"
import firebaseService from "@/services/FirebaseService"
import { getDatabase } from "firebase/database"
import { ref, off, onValue, push, set } from "firebase/database"
import firebaseApp from "@config/firebase"
import { Comment } from "types/interfaces/Comment"
import { ContentType } from "@utils/enums/contentTypes"
import { formatUnixTimestamp } from "@utils/static/formatTime"

interface CommentsProps {
  contentType: ContentType.Video | ContentType.Podcast
  contentId: string
}

type FormEvent = React.FormEvent<HTMLFormElement>

const db = getDatabase(firebaseApp)

const Comments: React.FC<CommentsProps> = ({ contentType, contentId }) => {
  const { user } = useAuth()
  const userId = user?.id
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState<string>("")
  const [isButtonVisible, setIsButtonVisible] = useState(false)

  const commentsPath =
    contentType === ContentType.Video ? `video_comments` : `podcast_comments`

  useEffect(() => {
    const commentsRef = ref(db, `${commentsPath}/${contentId}`)
    const commentsListener = onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const commentsData: Comment[] = Object.values(snapshot.val() || {})
        setComments(commentsData)
      }
    })

    return () => {
      off(commentsRef, "value", commentsListener)
    }
  }, [contentId, commentsPath])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value)
    setIsButtonVisible(e.target.value.length > 0)
  }

  const addComment = async (text: string) => {
    if (text.trim() === "") return

    try {
      if (userId !== undefined) {
        await firebaseService.addCommentToContent(
          contentType,
          contentId,
          userId,
          user!.name,
          text,
          user!.avatar
        )
        setCommentText("")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    addComment(commentText)
  }

  return (
    <div className="mx-24 mt-12">
      <h2 className="text-4xl font-bold tracking-widest border-l-2">
        Case Discussion
      </h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          className="p-3 text-l w-full rounded-sm bg-transparent text-white border-b-2 outline-none"
          placeholder="Add a comment"
          spellCheck="true"
          value={commentText}
          onChange={handleInputChange}
        />
        {isButtonVisible && (
          <button
            type="submit"
            className="mt-2 text-white p-2 rounded-full bg-gray-800/70 hover:bg-gray-800/40 hover:scale-105">
            Add comment
          </button>
        )}
      </form>
      <ul className="space-y-4 mt-4 mt-24 rounded-md">
        {comments
          .slice()
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((comment) => (
            <li key={comment.id} className="flex items-start mb-4">
              <div className="mr-4">
                <Image
                  src={comment.avatar}
                  alt="user avatar"
                  height={36}
                  width={36}
                  className="rounded-full"
                />
              </div>
              <div className="w-full">
                <div className="flex items-center mb-1">
                  <h2 className="text-white font-semibold">
                    {comment.username}
                  </h2>
                  <h3 className="text-gray-400 ml-2">
                    {formatUnixTimestamp(comment.timestamp)}
                  </h3>
                </div>
                <div className="bg-black/40 p-2 px-3 shadow-2xl rounded-full max-w-xl pointer-cursor hover:scale-110 transition duration-300">
                  {comment.text}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Comments
