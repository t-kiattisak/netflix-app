"use client"

import { useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import BaseReactPlayer from "react-player/youtube"
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
})
import { useVideoPlayer } from "@/presentation/providers/VideoPlayerProvider"
import Head from "next/head"
import Image from "next/image"

type YoutubePlayerProps = {
  videoId: string
  autoplay?: boolean
}

export function YoutubePlayer({
  videoId,
  autoplay = true,
}: YoutubePlayerProps) {
  const playerRef = useRef<typeof ReactPlayer | null>(null)
  const { setPlayer, playOnly, isMuted } = useVideoPlayer()
  const [ready, setReady] = useState(false)

  const youTubeUrl = useMemo(
    () => `https://www.youtube-nocookie.com/embed/${videoId}`,
    [videoId]
  )

  const muted = useMemo(() => isMuted(videoId), [isMuted, videoId])

  if (!BaseReactPlayer.canPlay(youTubeUrl)) {
    return (
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt='Video thumbnail'
        fill
        className='object-cover rounded-lg'
        priority
      />
    )
  }

  return (
    <div className='relative w-full h-full aspect-video rounded-lg overflow-hidden'>
      <Head>
        <link
          rel='preload'
          as='image'
          href={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        />
      </Head>
      {!ready && (
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt='Video thumbnail'
          fill
          className='object-cover rounded-lg'
          priority
        />
      )}
      <ReactPlayer
        ref={playerRef}
        url={youTubeUrl}
        playing={autoplay}
        muted={muted}
        loop
        controls={false}
        width='100%'
        height='100%'
        onReady={(player) => {
          const internal = player.getInternalPlayer()
          if (!internal) return

          setPlayer(videoId, {
            playVideo: () => internal.playVideo?.(),
            pauseVideo: () => internal.pauseVideo?.(),
            mute: () => internal.mute?.(),
            unMute: () => internal.unMute?.(),
          })

          setReady(true)
          playOnly(videoId)
        }}
        config={{
          playerVars: {
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            disablekb: 1,
          },
        }}
      />
    </div>
  )
}
