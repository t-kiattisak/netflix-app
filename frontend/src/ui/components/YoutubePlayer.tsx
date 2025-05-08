"use client"

import { useEffect, useRef } from "react"
import videojs from "video.js"
import type Player from "video.js/dist/types/player"
import "video.js/dist/video-js.css"
import "videojs-youtube"

import { useVideoPlayer } from "@/presentation/providers/VideoPlayerProvider"

type YoutubePlayerProps = {
  videoId: string
  autoplay?: boolean
}

export function YoutubePlayer({
  videoId,
  autoplay = true,
}: YoutubePlayerProps) {
  const playerRef = useRef<Player | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { setPlayer, playOnly } = useVideoPlayer()

  useEffect(() => {
    if (!containerRef.current || playerRef.current) return

    const videoEl = document.createElement("video-js")
    containerRef.current.appendChild(videoEl)

    const player = videojs(videoEl, {
      techOrder: ["youtube"],
      autoplay,
      controls: false,
      loop: true,
      muted: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          type: "video/youtube",
          src: `https://www.youtube.com/watch?v=${videoId}`,
        },
      ],
      youtube: {
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
      },
    })

    playerRef.current = player
    setPlayer(videoId, player)
    playOnly(videoId)

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId])

  return (
    <div data-vjs-player className='relative w-full h-full aspect-video'>
      <div
        ref={containerRef}
        className='absolute top-0 left-0 w-full h-[50px] bg-black/40 backdrop-blur-sm z-10 pointer-events-none rounded-t-lg'
      />
    </div>
  )
}
