const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY

export const SPOTIFY_HEADERS = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
}

export const YOUTUBER_HEADERS = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
}

export const PLAYLIST_IDs = [
  "PLCprSpAj-wvAf6l9ulK_2B_4BrHJM4j1s",
  "PLcFHkKbd_jTJiRmfUfLX2Ay_hnf5j3cxH",
  "PLoes2SLijGt1lBIbdC-X8uQEZkrdYv5_7",
]

export const PODCAST_IDs = [
  "3DgfoleqaW61T2amZQKINx",
  "4t4nuhMponRkNpX6xKFVNZ",
  "4d6RwH9XKnZ6osfNVc26eJ",
]

export const MAX_RESULTS = 10
