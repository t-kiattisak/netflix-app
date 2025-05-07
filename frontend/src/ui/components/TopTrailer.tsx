"use client"

import React, { useEffect, useMemo } from "react"
import { CircleAlertIcon, PlayIcon, Volume2, VolumeX } from "lucide-react"
import { YoutubePlayer } from "./YoutubePlayer"
import { useVideoPlayer } from "@/presentation/providers/VideoPlayerProvider"
import { movieDetailOptions } from "@/application/useCases/moviesOptions"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getRandomNumber } from "@/presentation/utils"
import { useInViewport } from "@/presentation/hooks/useInViewport"
import { useDebouncedValue } from "@/presentation/hooks/useDebouncedValue"

type TopTrailerProps = {
  movieId: number
}
export const TopTrailer = ({ movieId }: TopTrailerProps) => {
  const { isMuted, toggleMute, playOnly, pauseButKeepActive, activeVideoId } =
    useVideoPlayer()
  const { ref, inViewport } = useInViewport()
  const [inView] = useDebouncedValue(inViewport, 1000)

  const { data: movieDetailData, isLoading } = useSuspenseQuery(
    movieDetailOptions(movieId)
  )

  const videoId = useMemo(() => {
    const videos = movieDetailData?.videos ?? []
    const randomIndex = getRandomNumber(videos.length)
    return videos[randomIndex]?.key ?? "geFtxCSz8xI"
  }, [movieDetailData])

  useEffect(() => {
    if (!videoId || activeVideoId === null || activeVideoId !== videoId) return
    if (inView) {
      playOnly(videoId)
    } else {
      pauseButKeepActive(videoId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  if (isLoading) return <div>...loading</div>

  return (
    <div
      className='relative w-full aspect-video bg-black overflow-hidden z-10'
      ref={ref}
    >
      {videoId && <YoutubePlayer videoId={videoId} />}

      <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent' />
      <div className='absolute z-50 bottom-0 left-0 right-0 h-[15vw] bg-gradient-to-b from-5% from-transparent to-black/20 md:to-black' />

      <div className='absolute right-6 bottom-1/3 z-50 flex items-center gap-3'>
        <button
          className='bg-black/60 p-2 rounded-full hover:bg-white/20 transition'
          onClick={() => toggleMute(videoId)}
        >
          {isMuted(videoId) ? (
            <VolumeX className='text-white' />
          ) : (
            <Volume2 className='text-white' />
          )}
        </button>
        <div className='text-white bg-neutral-800 px-2 py-1 rounded text-xs'>
          18+
        </div>
      </div>

      <div className='absolute flex flex-col items-center sm:items-start left-0 sm:left-6 bottom-0 sm:bottom-1/4 z-20 w-full sm:w-[36%] space-y-4 text-white'>
        <h2 className='text-4xl font-bold leading-tight truncate'>
          {movieDetailData.title}
        </h2>
        <p className='text-base hidden md:block line-clamp-3 opacity-90'>
          {movieDetailData.overview}
        </p>
        <div className='flex gap-3'>
          <button className='flex gap-1 bg-white text-black px-4 py-2 rounded font-semibold hover:bg-neutral-200'>
            <PlayIcon className='text-black ' />
            Play
          </button>
          <button className='flex gap-1 bg-stone-400 text-white font-bold px-4 py-2 rounded'>
            <CircleAlertIcon className='text-white' />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}
