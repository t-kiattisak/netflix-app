"use client"

import { PlayIcon, PlusIcon, ThumbsUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import {
  MotionDialogContent,
  MotionDialogRoot,
  MotionDialogTrigger,
} from "./animations/MotionDialog"
import { MoviePreview } from "./MoviePreview"
// import { YoutubePlayer } from "./YoutubePlayer"

interface MovieHoverCardProps {
  posterUrl: string
  title: string
  duration: string
  maturityRating: string
  genres: string[]
  matchPercentage?: string
}

export function MovieHoverCard({
  posterUrl,
  title,
  duration,
  maturityRating,
  genres,
  matchPercentage = "84%",
}: MovieHoverCardProps) {
  return (
    <div className='bg-neutral-900 overflow-hidden shadow-2xl'>
      <div className='relative w-full h-[180px] overflow-hidden'>
        {/* <YoutubePlayer videoId='geFtxCSz8xI' /> */}
        <Image src={posterUrl} alt={title} fill className='object-cover' />
      </div>

      <div className='p-4 space-y-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <button className='bg-white text-black rounded-full p-2'>
              <PlayIcon size={18} />
            </button>
            <button className='text-white border border-white rounded-full p-2'>
              <PlusIcon size={18} />
            </button>
            <button className='text-white border border-white rounded-full p-2'>
              <ThumbsUp size={18} />
            </button>
          </div>

          <MotionDialogRoot>
            <MotionDialogTrigger>
              <button className='text-white border border-white rounded-full p-2'>
                <ChevronDown size={18} />
              </button>
            </MotionDialogTrigger>

            <MotionDialogContent>
              <MoviePreview
                preview={{
                  backdropUrl: posterUrl,
                  year: 2023,
                  episodeCount: 28,
                  maturityRating: "16+",
                  genre: "genre",
                  cast: "cast",
                  description: "description",
                  episodes: [
                    {
                      id: 1,
                      title: "The Journey's End",
                      duration: "26m",
                      thumbnailUrl: posterUrl,
                      description: "description",
                    },
                  ],
                }}
              />
            </MotionDialogContent>
          </MotionDialogRoot>
        </div>

        <div className='flex items-center space-x-3 text-sm text-white/70'>
          <span className='text-green-500 font-medium'>
            {matchPercentage} Match
          </span>
          <span className='border border-white/50 px-1'>{maturityRating}</span>
          <span>{duration}</span>
          <span className='border border-white/50 px-1'>HD</span>
        </div>

        <div className='text-white text-sm space-x-1'>
          {genres.map((genre, idx) => (
            <span key={genre}>
              {genre}
              {idx < genres.length - 1 && <span> • </span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
