"use client"

import { useRef, useState } from "react"
import type Player from "video.js/dist/types/player"
import { createSafeContext } from "./CreateSafeContext"

type VideoPlayerContextType = {
  player: Player | null
  muted: boolean
  setPlayer: (player: Player) => void
  toggleMute: () => void
}

export const [VideoPlayerContextProvider, useVideoPlayer] =
  createSafeContext<VideoPlayerContextType>(
    "useVideoPlayer must be used within a VideoPlayerProvider"
  )

export const VideoPlayerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [muted, setMuted] = useState(true)
  const playerRef = useRef<Player | null>(null)

  const setPlayer = (player: Player) => {
    playerRef.current = player
    player.muted(muted)
  }

  const toggleMute = () => {
    if (playerRef.current) {
      const newMuted = !muted
      playerRef.current.muted(newMuted)
      setMuted(newMuted)
    }
  }

  return (
    <VideoPlayerContextProvider
      value={{ player: playerRef.current, muted, setPlayer, toggleMute }}
    >
      {children}
    </VideoPlayerContextProvider>
  )
}
