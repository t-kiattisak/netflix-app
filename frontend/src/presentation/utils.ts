import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomNumber = (maxNumber: number) =>
  Math.floor(Math.random() * maxNumber)

type Video = {
  site: string
  type: string
}

export const pickMainVideo = <Data extends Video[]>(
  videos: Data
): Data[number] => {
  const priority = ["Trailer", "Teaser", "Clip"]

  return (
    videos
      .filter((v) => v.site === "YouTube")
      .sort((a, b) => {
        const aPriority = priority.indexOf(a.type)
        const bPriority = priority.indexOf(b.type)
        return aPriority - bPriority
      })
      .find(Boolean) || videos[0]
  )
}
