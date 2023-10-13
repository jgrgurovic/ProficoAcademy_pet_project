export interface VideoItem {
  contentDetails: {
    duration: string
  }
  snippet: {
    title: string
    description: string
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
