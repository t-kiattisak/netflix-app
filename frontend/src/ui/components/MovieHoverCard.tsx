"use client"

import { PlayIcon, PlusIcon, ThumbsUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import {
  MotionDialogContent,
  MotionDialogRoot,
  MotionDialogTrigger,
} from "./animations/MotionDialog"
import { MoviePreview } from "./MoviePreview"
import { useSuspenseQuery } from "@tanstack/react-query"
import { movieDetailOptions } from "@/application/useCases/moviesOptions"
// import { YoutubePlayer } from "./YoutubePlayer"

interface MovieHoverCardProps {
  posterUrl: string
  title: string
  duration: string
  maturityRating: string
  genres: string[]
  matchPercentage?: string
  movieID: number
}

export function MovieHoverCard({
  movieID,
  posterUrl,
  title,
  duration,
  maturityRating,
  genres,
  matchPercentage = "84%",
}: MovieHoverCardProps) {
  const { data: movieDetail, isLoading } = useSuspenseQuery(
    movieDetailOptions(movieID)
  )

  return (
    <div className='bg-neutral-900 overflow-hidden shadow-2xl'>
      <div className='relative w-full h-[180px] overflow-hidden'>
        {/* <YoutubePlayer videoId='geFtxCSz8xI' /> */}
        <Image
          src={posterUrl}
          alt={title}
          fill
          className='object-cover'
          sizes='(min-width: 60em) 24vw,(min-width: 28em) 45vw, 100vw'
        />
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
              {isLoading ? (
                <div>...loading</div>
              ) : (
                <MoviePreview
                  preview={{
                    backdropUrl: movieDetail.posterPath,
                    year: movieDetail.releaseDate?.split("-")[0],
                    maturityRating: "16+",
                    videoId: movieDetail.videos[0]?.key,
                    genre: movieDetail.genres
                      .map(({ name }) => name)
                      .join(", "),
                    description: movieDetail.overview,
                  }}
                />
              )}
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
