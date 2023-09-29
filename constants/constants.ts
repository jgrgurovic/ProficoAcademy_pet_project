const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY

export const SPOTIFY_HEADERS = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
}

export const YOUTUBER_HEADERS = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
}
