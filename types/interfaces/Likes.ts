export interface EpisodeItem {
  episodeId: string
  itemData: {
    id: string
    audioUrl: string
    coverArtUrl: string
    description: string
    title: string
  }
}

export interface VideoItem {
  videoId: string
  itemData: {
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
      ressourceId: {
        videoId: string
      }
    }
  }
}
