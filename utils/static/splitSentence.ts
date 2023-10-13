export const splitSentences = (text: string) => {
  const sentencePattern = /(?<=[.!])(?=(?:\s|[A-Z])[^\/])/
  const sentences = text.split(sentencePattern)
  return sentences
}
