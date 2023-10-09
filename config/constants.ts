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
  "PLvc9rIKnEgD9iGrIhBr883cc8wPbOojvT",
  "PLvc9rIKnEgD8xW0zRXDeAUgFmyRZLC9ID",
]

export const PODCAST_IDs = [
  "3DgfoleqaW61T2amZQKINx",
  "4t4nuhMponRkNpX6xKFVNZ",
  "4d6RwH9XKnZ6osfNVc26eJ",
  "6Mk7Wk6cmrgXWnitO3NdYe",
  "3lDOVjujdwyLS5l3CTSas2",
  "3FaeNsUJQSrK0PYeuEPhko",
  "4V3K3zyD0k789eaSWFXzhc",
]

export const MAX_RESULTS = 10
