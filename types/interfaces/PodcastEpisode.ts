export interface PodcastEpisode {
  id: string
  title: string
  name: string
  description: string
  audioUrl: string
  audio: {
    items: {
      url: string
    }[]
  }
  coverArt: {
    sources: {
      url: string
    }[]
  }
  duration: {
    totalMilliseconds: number
  }
  releaseDate: {
    isoString: string
  }
  publicationDate: string
  podcastName: string
  coverArtUrl: string
  uid: string
  podcastV2: {
    data: {
      name: string
      coverArt: string
    }
  }
}
