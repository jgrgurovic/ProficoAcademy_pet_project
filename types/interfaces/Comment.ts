export interface Comment {
  id: string
  text: string
  userId: number
  username: string
  avatar: string
  timestamp: number
  replyText: string
  showReplyInput: boolean
}
