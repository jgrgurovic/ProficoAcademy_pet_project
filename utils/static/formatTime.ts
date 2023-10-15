export function formatUnixTimestamp(unixTimestamp: number): string {
  const timestampDate = new Date(unixTimestamp)
  const now = new Date()

  const timeDifferenceInSeconds = Math.floor(
    (now.getTime() - timestampDate.getTime()) / 1000
  )

  if (timeDifferenceInSeconds < 60) {
    const seconds = timeDifferenceInSeconds
    const unit = seconds === 1 ? "second" : "seconds"
    return `${seconds} ${unit} ago`
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60)
    const unit = minutes === 1 ? "minute" : "minutes"
    return `${minutes} ${unit} ago`
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600)
    const unit = hours === 1 ? "hour" : "hours"
    return `${hours} ${unit} ago`
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400)
    const unit = days === 1 ? "day" : "days"
    return `${days} ${unit} ago`
  }
}
