import {
  parseISO,
  parseJSON,
  format,
  isAfter,
  formatDistanceToNow,
} from "date-fns"
import { enGB } from "date-fns/locale"

export enum DateFormats {
  fullNumericalDate = "dd.MM.yyyy.",
  hoursAndMinutes = "HH:mm",
  fullNumericalDateWithTime = "dd.MM.yyyy hh:mm",
  fullDateWithMonthName = "LLLL d, yyyy",
}

export const formatDate = (date: string, formatType: DateFormats): string =>
  format(parseISO(date), formatType)

export const isPostedAfterLastLogin = (
  date: string,
  dateToCompare: Date
): boolean => isAfter(parseJSON(date), dateToCompare)

export const checkTimeDistance = (updatedAt: string): string => {
  let timeAgo = ""
  if (updatedAt) {
    const date = parseISO(updatedAt)
    const timePeriod = formatDistanceToNow(date, { locale: enGB })

    timeAgo = `${timePeriod} ago`
  }

  return timeAgo
}

export const formatMillisecondsToMinutesAndSeconds = (
  totalMilliseconds: number
): { minutes: number; seconds: number } => {
  const minutes = Math.floor(totalMilliseconds / 60000)
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000)
  return { minutes, seconds }
}
