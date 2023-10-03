export interface VideoItem {
  snippet: {
    title: string
    publishedAt: string
    channelTitle: string
    resourceId: {
      videoId: string
    }
    tags: string[]
    thumbnails: {
      default: {
        url: string
        width: number
        height: number
      }
      medium: {
        url: string
        width: number
        height: number
      }
      high: {
        url: string
        width: number
        height: number
      }
      standard: {
        url: string
        width: number
        height: number
      }
    }
  }
}
