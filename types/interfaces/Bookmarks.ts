export interface EpisodeItem {
  contentType: "podcast"
  contentData: {
    name: string
    episodeId: string
    id: string
    audioUrl: string
    coverArt: {
      sources: {
        url: string
      }[]
    }
  }
}

export interface VideoItem {
  contentType: "video"
  contentData: {
    id: string
    snippet: {
      description: string
      channelTitle: string
      title: string
      thumbnails: {
        maxres: {
          url: string
          width: number
          height: number
        }
      }
    }
  }
}
