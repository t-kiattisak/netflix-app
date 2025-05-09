"use client"

import { useMemo, useState } from "react"
import YouTube, { YouTubePlayer } from "react-youtube"
import Image from "next/image"
import { useVideoPlayer } from "@/presentation/providers/VideoPlayerProvider"
import Head from "next/head"

type YoutubePlayerProps = {
  videoId: string
  autoplay?: boolean
}

export function YoutubePlayer({
  videoId,
  autoplay = true,
}: YoutubePlayerProps) {
  const { setPlayer, playOnly } = useVideoPlayer()
  const [playerReady, setPlayerReady] = useState(false)

  const opts = useMemo(
    () => ({
      height: "100%",
      width: "100%",
      playerVars: {
        autoplay: autoplay ? 1 : 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        loop: 1,
        mute: 1,
        playlist: videoId,
      },
    }),
    [autoplay, videoId]
  )

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(videoId, event.target)
    playOnly(videoId)
    setPlayerReady(true)
  }

  return (
    <div className='relative w-full h-full aspect-video'>
      <Head>
        <link
          rel='preload'
          as='image'
          href={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        />
      </Head>
      {!playerReady && (
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt='Video thumbnail'
          fill
          className='object-cover rounded-lg'
          priority
        />
      )}
      <YouTube
        videoId={videoId}
        opts={opts}
        loading='lazy'
        onReady={onReady}
        className='absolute top-0 left-0 w-full h-full'
        iframeClassName='w-full h-full rounded-lg'
      />
    </div>
  )
}
